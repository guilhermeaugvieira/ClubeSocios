import { limparBancoDeDados } from "../../Dados/Utilidades/Funcoes";
import { ObterTokenAcessoParaTestes } from "./ControladorColaborador.E2E.Test";
import Supertest from 'supertest'
import { Servidor } from "../Configuracoes/Servidor";
import { AdicionarSocioInput } from "../../Aplicacao/Modelos/Inputs/SocioInput";
import { AdicionarEnderecoInput } from "../../Aplicacao/Modelos/Inputs/EnderecoInput";
import { AdicionarPlanoInput, AtualizarPlanoInput } from "../../Aplicacao/Modelos/Inputs/PlanoInput";
import { AdicionarClienteInput } from "../../Aplicacao/Modelos/Inputs/ClienteInput";
import { ObterPlanoResult } from "../../Aplicacao/Modelos/Results/PlanoResult";
import { AdicionarSocioResult } from "../../Aplicacao/Modelos/Results/SocioResult";

afterEach(async () => {
  await limparBancoDeDados();
});

beforeAll(async () => {
  await limparBancoDeDados();
});

describe('Módulo API Plano - Obter Planos', () => {
  test('Ao obter planos quando existirem planos cadastrados deve ser retornado todos os dados dos planos', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoSocio = new AdicionarSocioInput(10, '35900000001', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Mensal 1', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000002', 'Teste1', 'P@ssw0rd', 'socio1@email.com')
    );
    
    const socioAdicionado1 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');   
      
    const planosAdicionados = await Supertest(Servidor)
    .get("/api/planos")
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json'); 

    const respostaObtencaoPlanos = planosAdicionados.body.dados as ObterPlanoResult[];
    const respostaAdicaoSocio = socioAdicionado1.body.dados as AdicionarSocioResult;

    const contemPlano = respostaObtencaoPlanos.some(plano => plano.id === respostaAdicaoSocio.plano.id);

    expect(contemPlano).toEqual(true);
  });

  test('Ao obter planos quando não existirem planos cadastrados deve ser retornado "No Content"', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
      
    const planosAdicionados = await Supertest(Servidor)
    .get("/api/planos")
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json'); 

    expect(planosAdicionados.noContent).toEqual(true);
  });
});

describe('Módulo API Plano - Obter Plano Por Id', () => {
  test('Ao obter plano cadastrado pelo id e o plano existir deve retornar os dados do plano', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoSocio = new AdicionarSocioInput(10, '35900000001', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Mensal 1', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000002', 'Teste1', 'P@ssw0rd', 'socio1@email.com')
    );
    
    const socioAdicionado1 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const planoEncontrado = await Supertest(Servidor)
      .get(`/api/planos/${socioAdicionado1.body.dados.plano.id}`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json'); 

    expect(planoEncontrado.body.dados.id).toEqual(socioAdicionado1.body.dados.plano.id);
  });
});

describe('Módulo API Plano - AdicionarPlano',() => {
  test('Ao adicionar plano, deve retornar as informações cadastradas', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoPlano = new AdicionarPlanoInput('Teste', 'TesteTeste', 'Mensal', 0, 'Sócio');

    const respostaAdicao = await Supertest(Servidor)
      .post("/api/planos")
      .send(novoPlano)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAdicaoPlano = respostaAdicao.body.dados;

    expect(respostaAdicao.status).toEqual(201);
    expect(resultadoAdicaoPlano.nome).toEqual('TESTE');
  });
});

describe('Módulo API Plano - AtualizarPlano',() => {
  test('Ao atualizar plano, deve retornar as informações cadastradas', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoPlano = new AdicionarPlanoInput('Teste', 'TesteTeste', 'Mensal', 0, 'Sócio');

    const respostaAdicaoPlano = await Supertest(Servidor)
    .post("/api/planos")
    .send(novoPlano)
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json');

    const resultadoAdicaoPlano = respostaAdicaoPlano.body.dados;

    const planoAtualizado = new AtualizarPlanoInput('Teste2', 'TesteTeste', 'Mensal', 0, 'Sócio');

    const respostaAtualizacao = await Supertest(Servidor)
      .put(`/api/planos/${resultadoAdicaoPlano.id}`)
      .send(planoAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAtualizacaoPlano = respostaAtualizacao.body.dados;

    expect(respostaAtualizacao.status).toEqual(200);
    expect(resultadoAtualizacaoPlano.nome).toEqual('TESTE2');
    expect(resultadoAtualizacaoPlano.id).toEqual(resultadoAdicaoPlano.id);
  });
});

describe('Módulo API Plano - AtualizarStatusPlano',() => {
  test('Ao atualizar o status do plano, deve retornar o novo status e o id', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoPlano = new AdicionarPlanoInput('Teste', 'TesteTeste', 'Mensal', 0, 'Sócio');

    const respostaAdicao = await Supertest(Servidor)
    .post("/api/planos")
    .send(novoPlano)
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json');

    const resultadoAdicaoPlano = respostaAdicao.body.dados;

    const planoAtualizado = {
      status: false,
    }

    const respostaAtualizacaoStatusPlano = await Supertest(Servidor)
      .patch(`/api/planos/${resultadoAdicaoPlano.id}`)
      .send(planoAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAtualizacaoStatusPlano = respostaAtualizacaoStatusPlano.body.dados;

    expect(respostaAtualizacaoStatusPlano.status).toEqual(200);
    expect(resultadoAtualizacaoStatusPlano.status).toEqual(false);
    expect(resultadoAtualizacaoStatusPlano.id).toEqual(resultadoAdicaoPlano.id);
  });

  test('Ao atualizar o status do plano para false e existir sócios atrelados, deve retornar null', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const erroEsperado = 'Para a desativação o plano não pode estar associado a nenhum sócio';
    
    const novoSocio = new AdicionarSocioInput(10, '35900000001', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Mensal 1', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000002', 'Teste1', 'P@ssw0rd', 'socio1@email.com')
    );
    
    const socioAdicionado1 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const planosAdicionados = await Supertest(Servidor)
    .get("/api/planos")
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json'); 

    const respostaObtencaoPlanos = planosAdicionados.body.dados as ObterPlanoResult[];

    const planoAtualizado = {
      status: false,
    }

    const respostaAtualizacaoStatusPlano = await Supertest(Servidor)
      .patch(`/api/planos/${respostaObtencaoPlanos[0].id}`)
      .send(planoAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAtualizacaoStatusPlano = respostaAtualizacaoStatusPlano.body.erros as string[];

    expect(respostaAtualizacaoStatusPlano.status).toEqual(409);
    expect(resultadoAtualizacaoStatusPlano.pop()).toEqual(erroEsperado);
  });
});