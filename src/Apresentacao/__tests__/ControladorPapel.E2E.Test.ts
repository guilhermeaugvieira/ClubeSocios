import { limparBancoDeDados } from "../../Dados/Utilidades/Funcoes";
import { ObterTokenAcessoParaTestes } from "./ControladorColaborador.E2E.Test";
import Supertest from 'supertest'
import { Servidor } from "../Configuracoes/Servidor";
import { ObterPapelResult } from "../../Aplicacao/Modelos/Results/PapelResult";
import { AdicionarColaboradorInput } from "../../Aplicacao/Modelos/Inputs/ColaboradorInput";
import { AdicionarClienteInput } from "../../Aplicacao/Modelos/Inputs/ClienteInput";
import { AdicionarPapelInput } from "../../Aplicacao/Modelos/Inputs/PapelInput";
import { v4 as uuid } from 'uuid';

afterEach(async () => {
  await limparBancoDeDados();
});

beforeAll(async () => {
  await limparBancoDeDados();
});

describe('Módulo API Papel - Obter Papéis', () => {
  test('Ao obter papeis quando existirem papéis cadastrados deve ser retornado todos os dados dos papéis', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const papelEsperado = "ADMINISTRADOR";

    const papeisCadastrados = await Supertest(Servidor)
      .get(`/api/papeis`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const respostaPapeis = papeisCadastrados.body.dados as ObterPapelResult[];

    expect(respostaPapeis[0].nome).toEqual(papelEsperado);
  });
});

describe('Módulo API Papel - Obter Papel Por Id', () => {
  test('Ao obter o papel cadastrado pelo Id, deve retornar as todas as informações do papel', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoColaborador = new AdicionarColaboradorInput(
      new AdicionarClienteInput('Teste Colaborador', "00000000000", 'TesteColaborador', "Ab2*bc32", "abc@email.com"),
      new AdicionarPapelInput("Secretaria")
    );
    
    const respostaAdicao = await Supertest(Servidor)
      .post("/api/colaboradores")
      .send(novoColaborador)
      .set('Accept', 'application/json');

    const resultadoAdicaoColaborador = respostaAdicao.body.dados;

    const papelCadastrado = await Supertest(Servidor)
      .get(`/api/papeis/${resultadoAdicaoColaborador.papel.id}`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    expect(papelCadastrado.status).toEqual(200); 
    expect(papelCadastrado.body.dados.nome).toEqual("SECRETARIA");   
    
  });

  test('Ao obter o papel cadastrado pelo Id e o papel não existir, deve retornar as todas as informações do papel', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const erroEsperado = 'Papel não foi encontrado';

    const papelCadastrado = await Supertest(Servidor)
      .get(`/api/papeis/${uuid()}`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const respostaObtencaoPapel = papelCadastrado.body.erros;

    expect(papelCadastrado.status).toEqual(404);    
    expect(respostaObtencaoPapel[0]).toEqual(erroEsperado);
  });
})