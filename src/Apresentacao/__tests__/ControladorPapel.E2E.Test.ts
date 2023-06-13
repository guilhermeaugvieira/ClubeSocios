import { limparBancoDeDados } from "../../Dados/Utilidades/Funcoes";
import { ObterTokenAcessoParaTestes } from "./ControladorColaborador.E2E.Test";
import Supertest from 'supertest'
import { Servidor } from "../Configuracoes/Servidor";
import { ObterPapelResult } from "../../Aplicacao/Modelos/Results/PapelResult";
import { AdicionarColaboradorInput } from "../../Aplicacao/Modelos/Inputs/ColaboradorInput";
import { AdicionarClienteInput } from "../../Aplicacao/Modelos/Inputs/ClienteInput";
import { AdicionarPapelInput, AtualizarPapelInput } from "../../Aplicacao/Modelos/Inputs/PapelInput";
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
});

describe('Módulo API Papel - AdicionarPapel',() => {
  test('Ao adicionar papel, deve retornar as informações cadastradas', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoPapel = new AdicionarPapelInput('Teste');

    const respostaAdicao = await Supertest(Servidor)
      .post("/api/papeis")
      .send(novoPapel)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAdicaoPapel = respostaAdicao.body.dados;

    expect(respostaAdicao.status).toEqual(201);
    expect(resultadoAdicaoPapel.nome).toEqual('TESTE');
  });
});

describe('Módulo API Papel - AtualizarPapel',() => {
  test('Ao atualizar papel, deve retornar as informações cadastradas', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoPapel = new AdicionarPapelInput('Teste');

    const respostaAdicao = await Supertest(Servidor)
    .post("/api/papeis")
    .send(novoPapel)
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json');

    const resultadoAdicaoPapel = respostaAdicao.body.dados;

    const papelAtualizado = new AtualizarPapelInput('Teste2');

    const respostaAtualizacao = await Supertest(Servidor)
      .put(`/api/papeis/${resultadoAdicaoPapel.id}`)
      .send(papelAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAtualizacaoPapel = respostaAtualizacao.body.dados;

    expect(respostaAtualizacao.status).toEqual(200);
    expect(resultadoAtualizacaoPapel.nome).toEqual('TESTE2');
    expect(resultadoAtualizacaoPapel.id).toEqual(resultadoAdicaoPapel.id);
  });
});

describe('Módulo API Papel - AtualizarStatusPapel',() => {
  test('Ao atualizar o status do papel, deve retornar o novo status e o id', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoPapel = new AdicionarPapelInput('Teste');

    const respostaAdicao = await Supertest(Servidor)
    .post("/api/papeis")
    .send(novoPapel)
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json');

    const resultadoAdicaoPapel = respostaAdicao.body.dados;

    const papelAtualizado = {
      status: false,
    }

    const respostaAtualizacaoStatusPapel = await Supertest(Servidor)
      .patch(`/api/papeis/${resultadoAdicaoPapel.id}`)
      .send(papelAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAtualizacaoStatusPapel = respostaAtualizacaoStatusPapel.body.dados;

    expect(respostaAtualizacaoStatusPapel.status).toEqual(200);
    expect(resultadoAtualizacaoStatusPapel.status).toEqual(false);
    expect(resultadoAtualizacaoStatusPapel.id).toEqual(resultadoAdicaoPapel.id);
  });

  test('Ao atualizar o status do papel para falso e havendo colaboradores, deve retornar null', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const erroEsperado = 'Para a desativação o papel não pode estar associado a nenhum colaborador';
    
    const papeisCadastrados = await Supertest(Servidor)
    .get(`/api/papeis`)
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json');

    const respostaPapeis = papeisCadastrados.body.dados as ObterPapelResult[];    

    const papelAtualizado = {
      status: false,
    }

    const respostaAtualizacaoStatusPapel = await Supertest(Servidor)
      .patch(`/api/papeis/${respostaPapeis[0].id}`)
      .send(papelAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAtualizacaoStatusPapel = respostaAtualizacaoStatusPapel.body.erros as string[];

    expect(respostaAtualizacaoStatusPapel.status).toEqual(409);
    expect(resultadoAtualizacaoStatusPapel.pop()).toEqual(erroEsperado);
  });
});