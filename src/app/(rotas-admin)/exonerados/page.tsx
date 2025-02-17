import * as exoneradosServices from "@/shared/services/exonerados.services";
import Content from "@/components/Content";
import Table from "@mui/joy/Table";
import Box from "@mui/joy/Box";

function pegarMesAtual() {
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio", 
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const mesAtual = new Date().getMonth();
  return meses[mesAtual];
}

export default async function Exonerados() {
  const Usuarios = await exoneradosServices.usuariosExonerados();
  console.log(Usuarios); // Adicione isso para verificar a estrutura dos dados

  const mesAtual = pegarMesAtual();

  return (
    <Content titulo={`Usuários exonerados ou transferidos em ${mesAtual}`}>
      <Box>
        <Table borderAxis="both">
          <thead>
            <tr>              
              <th>RF</th>
              <th>Usuário</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {Usuarios &&
              Usuarios.length > 0 &&
              Usuarios.map((usuario) => (
                <tr key={usuario.id}>                  
                  <td>{usuario.cpRF}</td>
                  <td>{`d${usuario.cpRF.slice(0,6)}`}</td>
                  <td>{usuario.cpNome}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Content>
  );
}
