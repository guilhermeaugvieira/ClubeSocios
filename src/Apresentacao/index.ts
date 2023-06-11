import { Servidor } from './Configuracoes/Servidor';

Servidor.listen(process.env.SERVER_PORT, ()=> {
  console.log(`Rodando no ambiente ${process.env.NODE_ENV}`);
  console.log(`Api rodando na porta ${process.env.SERVER_PORT}`);
});