import Supertest from 'supertest'
import { Servidor } from "../Configuracoes/Servidor";
import PrismaInstance from "../../PrismaInstance";
import { v4 as uuid } from 'uuid';
import { limparBancoDeDados } from '../../Dados/Utilidades/Funcoes';
import { AdicionarSocioInput, AtualizarSocioInput } from '../../Aplicacao/Modelos/Inputs/SocioInput';
import { AdicionarEnderecoInput, AtualizarEnderecoInput } from '../../Aplicacao/Modelos/Inputs/EnderecoInput';
import { AdicionarPlanoInput } from '../../Aplicacao/Modelos/Inputs/PlanoInput';
import { AdicionarClienteInput, AtualizarClienteInput } from '../../Aplicacao/Modelos/Inputs/ClienteInput';
import { ObterTokenAcessoParaTestes } from './ControladorColaborador.E2E.Test';
import { AdicionarSocioResult, ObterSocioResult } from '../../Aplicacao/Modelos/Results/SocioResult';
import { AdicionarDependenteInput } from '../../Aplicacao/Modelos/Inputs/DependenteInput';
import { AdicionarDependenteResult } from '../../Aplicacao/Modelos/Results/DependenteResult';
import { AdicionarVeiculoSocioInput } from '../../Aplicacao/Modelos/Inputs/VeiculoSocioInput';

afterEach(async () => {
  await limparBancoDeDados();
});

beforeAll(async () => {
  await limparBancoDeDados();
});

describe('Módulo API Sócios - Adicionar Sócios', () => {

  test('Ao adicionar um novo socio, especificando o plano, o cliente e o endereco, o servidor deve retornar 201', async() => {
    const loginEsperado = 'teste';
    const nomeEsperado = 'teste';
    const modalidadePlanoEsperada = 'teste';
    const tipoRecorrenciaPlanoEsperada = 'teste';
    const nomePlanoEsperado = 'teste';
    const descricaoPlanoEsperada = 'TesteTeste';
    const paisEnderecoEsperada = 'Teste';
    const cidadeEnderecoEsperada = 'Teste';
    const cepEnderecoEsperada = '00000-000';

    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00011122233", "socio@email.com");

    const novoSocio = new AdicionarSocioInput(10, '00000000000', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', 'P@ssw0rd', 'abc@email.com')
    );
    
    const resposta = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoResposta = resposta.body.dados;

    expect(resposta.statusCode).toBe(201);
    expect(corpoResposta.cliente.login).toEqual(loginEsperado.toUpperCase());
    expect(corpoResposta.cliente.nome).toEqual(nomeEsperado.toUpperCase());
    expect(corpoResposta.plano.modalidade).toEqual(modalidadePlanoEsperada.toUpperCase());
    expect(corpoResposta.plano.tipoRecorrencia).toEqual(tipoRecorrenciaPlanoEsperada.toUpperCase());
    expect(corpoResposta.plano.nome).toEqual(nomePlanoEsperado.toUpperCase());
    expect(corpoResposta.plano.descricao).toEqual(descricaoPlanoEsperada);
    expect(corpoResposta.endereco.pais).toEqual(paisEnderecoEsperada.toUpperCase());
    expect(corpoResposta.endereco.cidade).toEqual(cidadeEnderecoEsperada.toUpperCase());
    expect(corpoResposta.endereco.cep).toEqual(cepEnderecoEsperada);
  });

  test('Ao adicionar um novo socio, especificando o id do plano, o id do cliente e o endereco, o servidor deve retornar 201', async() => {
    const loginEsperado = 'teste';
    const nomeEsperado = 'teste';
    const modalidadePlanoEsperada = 'teste';
    const tipoRecorrenciaPlanoEsperada = 'teste';
    const nomePlanoEsperado = 'teste';
    const descricaoPlanoEsperada = 'TesteTeste';
    const paisEnderecoEsperada = 'Teste';
    const cidadeEnderecoEsperada = 'Teste';
    const cepEnderecoEsperada = '00000-000';

    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00011122233", "socio@email.com");

    const novoCliente = await PrismaInstance.cliente.create({
      data: {
        Ativo: true,
        Documento: '00000000000',
        Login: 'TESTE',
        Senha: 'P@ssw0rd',
        Email: 'abc@email.com',
        Nome: 'TESTE',
        DataAtualizacao: null,
        DataCriacao: new Date(),
        Id: uuid(),
      }
    });

    const novoPlano = await PrismaInstance.plano.create({
      data: {
        Ativo: true,
        Descricao: 'TesteTeste',
        Modalidade: 'TESTE',
        Nome: 'TESTE',
        TipoRecorrencia: 'TESTE',
        ValorMensalidade: 0,
        DataAtualizacao: null,
        DataCriacao: new Date(),
        Id: uuid(),
      }
    });

    const novoSocio = new AdicionarSocioInput(10, '00000000000', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', novoPlano.Id, novoCliente.Id, null, null);
    
    const resposta = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio)
      .set("Authorization", tokenAcesso)
      .set('Accept', 'application/json');

    const corpoResposta = resposta.body.dados;

    expect(resposta.statusCode).toBe(201);
    expect(corpoResposta.cliente.login).toEqual(loginEsperado.toUpperCase());
    expect(corpoResposta.cliente.nome).toEqual(nomeEsperado.toUpperCase());
    expect(corpoResposta.plano.modalidade).toEqual(modalidadePlanoEsperada.toUpperCase());
    expect(corpoResposta.plano.tipoRecorrencia).toEqual(tipoRecorrenciaPlanoEsperada.toUpperCase());
    expect(corpoResposta.plano.nome).toEqual(nomePlanoEsperado.toUpperCase());
    expect(corpoResposta.plano.descricao).toEqual(descricaoPlanoEsperada);
    expect(corpoResposta.endereco.pais).toEqual(paisEnderecoEsperada.toUpperCase());
    expect(corpoResposta.endereco.cidade).toEqual(cidadeEnderecoEsperada.toUpperCase());
    expect(corpoResposta.endereco.cep).toEqual(cepEnderecoEsperada);
  });
});

describe('Módulo API Socios - Atualizar Sócios', () => {
  test('Ao atualizar um sócio com documento já usado por outro cliente deve ser apresentado o erro "Documento especificado já é usado por outro cliente"', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const erroEsperado = 'Documento especificado já é usado por outro cliente';

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

    const novoSocio2 = new AdicionarSocioInput(10, '35900000002', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Mensal 2', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000003', 'Teste2', 'P@ssw0rd', 'socio2@email.com')
    );

    const socioAdicionado2 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const socioAtualizado = new AtualizarSocioInput(1, '35900000001', "Mensal 1", 
      new AtualizarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10), 
      new AtualizarClienteInput('Teste 1', '00000000003', 'Teste1', 'socio1@email.com'));

    const socioAtualizadoResult = await Supertest(Servidor)
      .put(`/api/socios/${socioAdicionado1.body.dados.id}`)
      .send(socioAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const errosAtualizacao = socioAtualizadoResult.body.erros;

    expect(errosAtualizacao[0]).toEqual(erroEsperado);
  });

  test('Ao atualizar um sócio com email já usado por outro cliente deve ser apresentado o erro "Email especificado já é usado por outro cliente"', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const erroEsperado = 'Email especificado já é usado por outro cliente';

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

    const novoSocio2 = new AdicionarSocioInput(10, '35900000002', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Mensal 2', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000003', 'Teste2', 'P@ssw0rd', 'socio2@email.com')
    );

    const socioAdicionado2 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const socioAtualizado = new AtualizarSocioInput(1, '35900000001', "Mensal 1", 
      new AtualizarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10), 
      new AtualizarClienteInput('Teste 1', '00000000002', 'Teste1', 'socio2@email.com'));

    const socioAtualizadoResult = await Supertest(Servidor)
      .put(`/api/socios/${socioAdicionado1.body.dados.id}`)
      .send(socioAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const errosAtualizacao = socioAtualizadoResult.body.erros;

    expect(errosAtualizacao[0]).toEqual(erroEsperado);
  });

  test('Ao atualizar um sócio com login já usado por outro cliente deve ser apresentado o erro "Login especificado já é usado por outro cliente"', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const erroEsperado = 'Login especificado já é usado por outro cliente';

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

    const novoSocio2 = new AdicionarSocioInput(10, '35900000002', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Mensal 2', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000003', 'Teste2', 'P@ssw0rd', 'socio2@email.com')
    );

    const socioAdicionado2 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const socioAtualizado = new AtualizarSocioInput(1, '35900000001', "Mensal 1", 
      new AtualizarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10), 
      new AtualizarClienteInput('Teste 1', '00000000002', 'Teste2', 'socio1@email.com'));

    const socioAtualizadoResult = await Supertest(Servidor)
      .put(`/api/socios/${socioAdicionado1.body.dados.id}`)
      .send(socioAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const errosAtualizacao = socioAtualizadoResult.body.erros;

    expect(errosAtualizacao[0]).toEqual(erroEsperado);
  });

  test('Ao atualizar um sócio deve ser retornado os dados da atualização', async () => {
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

    const novoSocio2 = new AdicionarSocioInput(10, '35900000002', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Mensal 2', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000003', 'Teste2', 'P@ssw0rd', 'socio2@email.com')
    );

    const socioAdicionado2 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const socioAtualizado = new AtualizarSocioInput(5, '35900000001', "Mensal 1", 
      new AtualizarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10), 
      new AtualizarClienteInput('Teste 1', '00000000002', 'Teste1', 'socio1@email.com'));

    const socioAtualizadoResult = await Supertest(Servidor)
      .put(`/api/socios/${socioAdicionado1.body.dados.id}`)
      .send(socioAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const resultadoAtualizacao = socioAtualizadoResult.body.dados;

    expect(resultadoAtualizacao.apelido).toEqual('Teste');
    expect(resultadoAtualizacao.cliente.nome).toEqual('TESTE 1');
    expect(resultadoAtualizacao.cliente.login).toEqual('TESTE1');
    expect(resultadoAtualizacao.diaVencimentoPagamento).toEqual(5);
  });
});

describe('Módulo API Socios - Atualizar Status', () => {
  test('Ao atualizar o status do sócio pelo mesmo status deve ser apresentado o erro "Sócio já está ..."', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const erroEsperado = 'Sócio já está habilitado';

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

    const socioAtualizadoResult = await Supertest(Servidor)
      .patch(`/api/socios/${socioAdicionado1.body.dados.id}`)
      .send({
        status: true,
      })
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const respostaAtualizacao = socioAtualizadoResult.body.erros;

    expect(respostaAtualizacao[0]).toEqual(erroEsperado);
  });

  test('Ao atualizar o status do sócio deve ser retornado o id do cliente e o status atualizado', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const statusEsperado = false;

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

    const socioAtualizadoResult = await Supertest(Servidor)
      .patch(`/api/socios/${socioAdicionado1.body.dados.id}`)
      .send({
        status: false,
      })
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const respostaAtualizacao = socioAtualizadoResult.body.dados;

    expect(respostaAtualizacao.id).toEqual(socioAdicionado1.body.dados.id);
    expect(respostaAtualizacao.status).toEqual(statusEsperado);
  });
});

describe('Módulo API Socios - Obter Sócios', () => {
  test('Ao obter sócios quando existirem sócios cadastrados deve ser retornado todos os dados do sócio', async () => {
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

    const corpoSocioAdicionado1 = socioAdicionado1.body.dados as AdicionarSocioResult;

    const novoDependente1 = new AdicionarDependenteInput(
      new AdicionarClienteInput("Dependente", "00000000003", "dependente1", "S3nh@For73", "dependente@email.com"),
      null
    );

    const respostaAdicaoDependente1 = await Supertest(Servidor)
      .post(`/api/socios/${corpoSocioAdicionado1.id}/dependentes`)
      .send(novoDependente1)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const novoDependente2 = new AdicionarDependenteInput(
      new AdicionarClienteInput("Dependente2", "00000000004", "dependente2", "S3nh@For735", "dependente2@email.com"),
      null
    );

    const respostaAdicaoDependente2 = await Supertest(Servidor)
      .post(`/api/socios/${corpoSocioAdicionado1.id}/dependentes`)
      .send(novoDependente2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const placa1 = "ABC1234"
  
    const novoVeiculo1 = new AdicionarVeiculoSocioInput(placa1);

    const respostaAdicaoVeiculo1 = await Supertest(Servidor)
      .post(`/api/socios/${corpoSocioAdicionado1.id}/veiculos`)
      .send(novoVeiculo1)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const placa2 = "ABC5678"
    
    const novoVeiculo2 = new AdicionarVeiculoSocioInput(placa2);

    const respostaAdicaoVeiculo2 = await Supertest(Servidor)
      .post(`/api/socios/${corpoSocioAdicionado1.id}/veiculos`)
      .send(novoVeiculo2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const sociosCadastrados = await Supertest(Servidor)
      .get(`/api/socios`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const respostaObtencao = sociosCadastrados.body.dados as ObterSocioResult[];

    const contemId = respostaObtencao.some(item => item.id === socioAdicionado1.body.dados.id);

    expect(contemId).toEqual(true);
    expect(sociosCadastrados.status).toEqual(200);
  });

  test('Ao obter sócios quando existirem não sócios cadastrados deve ser retornado NoContent', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");

    const novoSocio = new AdicionarSocioInput(10, '35900000001', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Mensal 1', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000002', 'Teste1', 'P@ssw0rd', 'socio1@email.com')
    );

    const sociosCadastrados = await Supertest(Servidor)
      .get(`/api/socios`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    expect(sociosCadastrados.status).toEqual(204);
  });
});

describe('Módulo API Socios - Obter Sócio Por Id', () => {
  test('Ao obter o sócio cadastrado pelo Id, deve retornar as todas as informações do sócio', async () => {
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

    const sociosCadastrados = await Supertest(Servidor)
      .get(`/api/socios/${socioAdicionado1.body.dados.id}`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const respostaAtualizacao = sociosCadastrados.body.dados as ObterSocioResult;

    expect(socioAdicionado1.body.dados.id).toEqual(respostaAtualizacao.id);
    expect(sociosCadastrados.status).toEqual(200);
  });

  test('Ao obter o sócio cadastrado pelo Id e o cliente não for cadastrado, deve retornar o erro "Sócio não foi encontrado"', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const erroEncontrado = 'Sócio não foi encontrado';

    const sociosCadastrados = await Supertest(Servidor)
      .get(`/api/socios/${uuid()}`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const respostaAtualizacao = sociosCadastrados.body.erros as string[];

    expect(respostaAtualizacao[0]).toEqual(erroEncontrado);
  });
})