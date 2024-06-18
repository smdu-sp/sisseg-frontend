import * as ldapServices from "@/shared/services/ldap.services";
import Content from "@/components/Content";
import Table from "@mui/joy/Table";
import Box from "@mui/joy/Box";

export default async function Inativos() {
  const Usuarios = await ldapServices.buscaUsuariosInativos();
  return (
    <Content>
      <Box>        
        <Table borderAxis="both">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {Usuarios &&
              Usuarios.length > 0 &&
              Usuarios.map((usuario) => (
                <tr key={usuario[0].values[0]}>
                  <td>{usuario[0].values[0]}</td>
                  <td>{usuario[1].values[0]}</td>
                  <td>{usuario[2] && usuario[2].values[0]}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Content>
  );
}
