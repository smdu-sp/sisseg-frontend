import * as exoneradosServices from "@/shared/services/exonerados.services";
import Content from "@/components/Content";
import Table from "@mui/joy/Table";
import Box from "@mui/joy/Box";

export default async function Exonerados() {
  const Usuarios = await exoneradosServices.usuariosExonerados();
  console.log(Usuarios); // Adicione isso para verificar a estrutura dos dados
  return (
    <Content titulo="Usários Exonerados ou Transferidos">
      <Box>
        <Table borderAxis="both">
          <thead>
            <tr>              
              <th>RF</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {Usuarios &&
              Usuarios.length > 0 &&
              Usuarios.map((usuario) => (
                <tr key={usuario.id}>                  
                  <td>{usuario.cpRF}</td>
                  <td>{usuario.cpNome}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Content>
  );
}
