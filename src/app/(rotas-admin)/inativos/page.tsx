'use client'

import * as ldapServices from "@/shared/services/ldap.services";
import Content from "@/components/Content";
import Table from "@mui/joy/Table";
import Box from "@mui/joy/Box";
import { FormControl, FormLabel, Option, Select, Skeleton } from "@mui/joy";
import { useEffect, useState } from "react";

export default function Inativos() {
  const [usuarios, setUsuarios] = useState<{ nome: string, mail: string, usuario: string, timestamp: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [dias, setDias] = useState(30);
  useEffect(() => {
    setLoading(true);
    ldapServices.buscaUsuariosInativos(dias).then((result) => {
      setUsuarios(result);
      setLoading(false);
    })
  }, [dias])
  return (
    <Content>
      <Box>
        <FormControl>
          <FormLabel>Dias sem acesso</FormLabel>
          <Select value={dias} onChange={(_, value) => value && setDias(value)}>
            <Option value={10}>10 dias</Option>
            <Option value={20}>15 dias</Option>
            <Option value={30}>30 dias</Option>
            <Option value={45}>45 dias</Option>
            <Option value={60}>60 dias</Option>
            <Option value={90}>90 dias</Option>
          </Select>
        </FormControl>
      </Box>
      <Box>        
        <Table borderAxis="both">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Último acesso</th>
            </tr>
          </thead>
          <tbody>
            {!loading ?
              usuarios && usuarios.length > 0 ? usuarios.map((usuario) => (
                <tr key={usuario.usuario}>
                  <td>{usuario.nome}</td>                  
                  <td>{usuario.usuario}</td>
                  <td>{usuario.mail}</td>
                  <td>{(new Date(usuario.timestamp*1000)).toLocaleDateString()}</td>
                </tr>
              )) : <tr>
                <td colSpan={4}>Nenhum registro encontrado</td>
              </tr> : (
                <tr>
                  <td colSpan={4}>
                    <Skeleton variant="text" />
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </Box>
    </Content>
  );
}
