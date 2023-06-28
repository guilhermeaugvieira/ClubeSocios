import { AdicionarClienteInput, AtualizarClienteInput } from "../../Aplicacao/Modelos/Inputs/ClienteInput";
import { AdicionarEnderecoInput } from "../../Aplicacao/Modelos/Inputs/EnderecoInput";
import { AdicionarPlanoInput } from "../../Aplicacao/Modelos/Inputs/PlanoInput";
import { AdicionarSocioInput } from "../../Aplicacao/Modelos/Inputs/SocioInput";
import { limparBancoDeDados } from "../../Dados/Utilidades/Funcoes";
import { ObterTokenAcessoParaTestes } from "./ControladorColaborador.E2E.Test";
import Supertest from 'supertest';
import { Servidor } from "../Configuracoes/Servidor";
import { AdicionarDependenteInput, AtualizarDependenteInput } from "../../Aplicacao/Modelos/Inputs/DependenteInput";
import { AdicionarSocioResult } from "../../Aplicacao/Modelos/Results/SocioResult";
import { AdicionarDependenteResult, AtualizarDependenteResult } from "../../Aplicacao/Modelos/Results/DependenteResult";
import { Notificacao } from "../../Core/Notificacao";

afterEach(async () => {
  await limparBancoDeDados();
});

beforeAll(async () => {
  await limparBancoDeDados();
});

describe("Módulo API Dependente - AdicionarDependente", () => {
  test("Ao adicionar um novo dependente para um sócio, deve ser retornado os dados inseridos", async () => {

    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00011122233", "socio@email.com");

    const novoSocio = new AdicionarSocioInput(10, '00000000000', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', 'P@ssw0rd', 'abc@email.com')
    );
    
    const respostaAdicaoSocio = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio = respostaAdicaoSocio.body.dados as AdicionarSocioResult;
    
    const nomeDependente = "Dependente";
    const loginDependente = "dependente1";
    
    const novoDependente = new AdicionarDependenteInput(
      new AdicionarClienteInput("Dependente", "00000000001", "dependente1", "S3nh@For73", "dependente@email.com"),
      null
    );

    const respostaAdicaoDependente = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio.id}/dependentes`)
      .send(novoDependente)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoDependente = respostaAdicaoDependente.body.dados as AdicionarDependenteResult;

    expect(respostaAdicaoDependente.statusCode).toEqual(201);
    expect(corpoRespostaAdicaoDependente.idSocio).toEqual(corpoRespostaAdicaoSocio.id);
    expect(corpoRespostaAdicaoDependente.cliente.login).toEqual(loginDependente.toUpperCase());
    expect(corpoRespostaAdicaoDependente.cliente.nome).toEqual(nomeDependente.toUpperCase());
  });
});

describe("Módulo API Dependente - AtualizarDependente", () => {
  test("Ao atualizar um dependente para um sócio, onde o documento do cliente já existe, deve retornar null", async () => {

    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00011122233", "socio@email.com");

    const erroEsperado = 'Já existe cliente com o documento fornecido';

    const novoSocio1 = new AdicionarSocioInput(10, '00000000000', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', 'P@ssw0rd', 'abc@email.com')
    );
    
    const respostaAdicaoSocio1 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio1)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio1 = respostaAdicaoSocio1.body.dados as AdicionarSocioResult;

    const novoSocio2 = new AdicionarSocioInput(10, '00000000001', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000001', 'Teste1', 'P@ssw0rd', 'abc2@email.com')
    );
    
    const respostaAdicaoSocio2 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio2 = respostaAdicaoSocio2.body.dados as AdicionarSocioResult;
    
    const novoDependente = new AdicionarDependenteInput(
      new AdicionarClienteInput("Dependente", "00000000002", "dependente1", "S3nh@For73", "dependente@email.com"),
      null
    );

    const respostaAdicaoDependente = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio1.id}/dependentes`)
      .send(novoDependente)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

      const corpoRespostaAdicaoDependente = respostaAdicaoDependente.body.dados as AdicionarDependenteResult;

    const dependenteAtualizado = new AtualizarDependenteInput(
      new AtualizarClienteInput("Dependente", "00000000001", "dependente1", "dependente@email.com"),
    );

    const respostaDependenteAtualizado = await Supertest(Servidor)
      .put(`/api/socios/${corpoRespostaAdicaoSocio1.id}/dependentes/${corpoRespostaAdicaoDependente.id}`)
      .send(dependenteAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAtualizarDependente = respostaDependenteAtualizado.body.erros as Notificacao[];

    expect(respostaDependenteAtualizado.statusCode).toEqual(409);
    expect(corpoRespostaAtualizarDependente.at(0)).toEqual(erroEsperado);
  });

  test("Ao atualizar um dependente para um sócio, onde o email do cliente já existe, deve retornar null", async () => {

    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00011122233", "socio@email.com");

    const erroEsperado = 'Já existe cliente com o email cadastrado';

    const novoSocio1 = new AdicionarSocioInput(10, '00000000000', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', 'P@ssw0rd', 'abc@email.com')
    );
    
    const respostaAdicaoSocio1 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio1)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio1 = respostaAdicaoSocio1.body.dados as AdicionarSocioResult;

    const novoSocio2 = new AdicionarSocioInput(10, '00000000001', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000001', 'Teste1', 'P@ssw0rd', 'abc2@email.com')
    );
    
    const respostaAdicaoSocio2 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio2 = respostaAdicaoSocio2.body.dados as AdicionarSocioResult;
    
    const novoDependente = new AdicionarDependenteInput(
      new AdicionarClienteInput("Dependente", "00000000002", "dependente1", "S3nh@For73", "dependente@email.com"),
      null
    );

    const respostaAdicaoDependente = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio1.id}/dependentes`)
      .send(novoDependente)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

      const corpoRespostaAdicaoDependente = respostaAdicaoDependente.body.dados as AdicionarDependenteResult;

    const dependenteAtualizado = new AtualizarDependenteInput(
      new AtualizarClienteInput("Dependente", "00000000002", "dependente1", "abc2@email.com"),
    );

    const respostaDependenteAtualizado = await Supertest(Servidor)
      .put(`/api/socios/${corpoRespostaAdicaoSocio1.id}/dependentes/${corpoRespostaAdicaoDependente.id}`)
      .send(dependenteAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAtualizarDependente = respostaDependenteAtualizado.body.erros as Notificacao[];

    expect(respostaDependenteAtualizado.statusCode).toEqual(409);
    expect(corpoRespostaAtualizarDependente.at(0)).toEqual(erroEsperado);
  });

  test("Ao atualizar um dependente para um sócio, onde o login do cliente já existe, deve retornar null", async () => {

    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00011122233", "socio@email.com");

    const erroEsperado = 'Já existe cliente com o login cadastrado';

    const novoSocio1 = new AdicionarSocioInput(10, '00000000000', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', 'P@ssw0rd', 'abc@email.com')
    );
    
    const respostaAdicaoSocio1 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio1)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio1 = respostaAdicaoSocio1.body.dados as AdicionarSocioResult;

    const novoSocio2 = new AdicionarSocioInput(10, '00000000001', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000001', 'Teste1', 'P@ssw0rd', 'abc2@email.com')
    );
    
    const respostaAdicaoSocio2 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio2 = respostaAdicaoSocio2.body.dados as AdicionarSocioResult;
    
    const novoDependente = new AdicionarDependenteInput(
      new AdicionarClienteInput("Dependente", "00000000002", "dependente1", "S3nh@For73", "dependente@email.com"),
      null
    );

    const respostaAdicaoDependente = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio1.id}/dependentes`)
      .send(novoDependente)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

      const corpoRespostaAdicaoDependente = respostaAdicaoDependente.body.dados as AdicionarDependenteResult;

    const dependenteAtualizado = new AtualizarDependenteInput(
      new AtualizarClienteInput("Dependente", "00000000002", "Teste1", "dependende@email.com"),
    );

    const respostaDependenteAtualizado = await Supertest(Servidor)
      .put(`/api/socios/${corpoRespostaAdicaoSocio1.id}/dependentes/${corpoRespostaAdicaoDependente.id}`)
      .send(dependenteAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAtualizarDependente = respostaDependenteAtualizado.body.erros as Notificacao[];

    expect(respostaDependenteAtualizado.statusCode).toEqual(409);
    expect(corpoRespostaAtualizarDependente.at(0)).toEqual(erroEsperado);
  });

  test("Ao atualizar um dependente para um sócio com sucesso, deve ser retornado os dados inseridos", async () => {

    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00011122233", "socio@email.com");

    const erroEsperado = 'Já existe cliente com o login cadastrado';

    const novoSocio1 = new AdicionarSocioInput(10, '00000000000', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', 'P@ssw0rd', 'abc@email.com')
    );
    
    const respostaAdicaoSocio1 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio1)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio1 = respostaAdicaoSocio1.body.dados as AdicionarSocioResult;

    const novoSocio2 = new AdicionarSocioInput(10, '00000000001', 
      new AdicionarEnderecoInput('Teste', 'Teste', '00000-000', 'Teste', 'Teste', 10),
      'Teste', null, null, 
      new AdicionarPlanoInput('Teste', 'TesteTeste', 'Teste', 0, 'Teste'),
      new AdicionarClienteInput('Teste', '00000000001', 'Teste1', 'P@ssw0rd', 'abc2@email.com')
    );
    
    const respostaAdicaoSocio2 = await Supertest(Servidor)
      .post("/api/socios")
      .send(novoSocio2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoSocio2 = respostaAdicaoSocio2.body.dados as AdicionarSocioResult;
    
    const novoDependente = new AdicionarDependenteInput(
      new AdicionarClienteInput("Dependente", "00000000002", "dependente1", "S3nh@For73", "dependente@email.com"),
      null
    );

    const respostaAdicaoDependente = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio1.id}/dependentes`)
      .send(novoDependente)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

      const corpoRespostaAdicaoDependente = respostaAdicaoDependente.body.dados as AdicionarDependenteResult;

    const dependenteAtualizado = new AtualizarDependenteInput(
      new AtualizarClienteInput("Dependente", "00000000002", "dependente2", "dependende@email.com"),
    );

    const respostaDependenteAtualizado = await Supertest(Servidor)
      .put(`/api/socios/${corpoRespostaAdicaoSocio1.id}/dependentes/${corpoRespostaAdicaoDependente.id}`)
      .send(dependenteAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAtualizarDependente = respostaDependenteAtualizado.body.dados as AtualizarDependenteResult;

    expect(respostaDependenteAtualizado.statusCode).toEqual(200);
    expect(corpoRespostaAtualizarDependente.idSocio).toEqual(corpoRespostaAdicaoSocio1.id);
    expect(corpoRespostaAtualizarDependente.id).toEqual(corpoRespostaAdicaoDependente.id);
    expect(corpoRespostaAtualizarDependente.cliente.login).toEqual("DEPENDENTE2");
  });
});