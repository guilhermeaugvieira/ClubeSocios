import { limparBancoDeDados } from "../../Dados/Utilidades/Funcoes";
import { ObterTokenAcessoParaTestes } from "./ControladorColaborador.E2E.Test";
import Supertest from 'supertest'
import { Servidor } from "../Configuracoes/Servidor";
import { AdicionarSocioInput } from "../../Aplicacao/Modelos/Inputs/SocioInput";
import { AdicionarEnderecoInput } from "../../Aplicacao/Modelos/Inputs/EnderecoInput";
import { AdicionarPlanoInput } from "../../Aplicacao/Modelos/Inputs/PlanoInput";
import { AdicionarClienteInput } from "../../Aplicacao/Modelos/Inputs/ClienteInput";
import { AdicionarSocioResult } from "../../Aplicacao/Modelos/Results/SocioResult";
import { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput } from "../../Aplicacao/Modelos/Inputs/VeiculoSocioInput";
import { AdicionarVeiculoSocioResult, AtualizarVeiculoSocioResult, ObterVeiculoSocioResult, VeiculoSocioStatusResult } from "../../Aplicacao/Modelos/Results/VeiculoSocioResult";

afterEach(async () => {
  await limparBancoDeDados();
});

beforeAll(async () => {
  await limparBancoDeDados();
});

describe("Módulo API VeiculoSocio - AdicionarVeiculo", () => {
  test("Ao adicionar um novo veículo para um sócio, deve ser retornado os dados inseridos", async () => {

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

    const placa = "ABC1234";
    
    const novoVeiculo = new AdicionarVeiculoSocioInput(placa);

    const respostaAdicaoVeiculo = await Supertest(Servidor)
    .post(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
    .send(novoVeiculo)
    .set('Authorization', tokenAcesso)
    .set('Accept', 'application/json');

    const corpoRespostaAdicaoVeiculo = respostaAdicaoVeiculo.body.dados as AdicionarVeiculoSocioResult;

    expect(respostaAdicaoVeiculo.statusCode).toEqual(201);
    expect(corpoRespostaAdicaoVeiculo.idSocio).toEqual(corpoRespostaAdicaoSocio.id);
    expect(corpoRespostaAdicaoVeiculo.placa).toEqual(placa);
  });
})

describe("Módulo API VeiculoSocio - AtualizarVeiculo", () => {
  test("Ao atualizar um veículo do sócio, deve ser retornado os dados atualizados", async () => {

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

    const placa = "ABC4569";
    
    const novoVeiculo = new AdicionarVeiculoSocioInput("ABC1234");

    const respostaAdicaoVeiculo = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
      .send(novoVeiculo)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoVeiculo = respostaAdicaoVeiculo.body.dados as AdicionarVeiculoSocioResult;

    const veiculoAtualizado = new AtualizarVeiculoSocioInput(placa);

    const respostaAtualizacaoVeiculo = await Supertest(Servidor)
      .put(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos/${corpoRespostaAdicaoVeiculo.id}`)
      .send(veiculoAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

      const corpoRespostaAtualizacaoVeiculo = respostaAtualizacaoVeiculo.body.dados as AtualizarVeiculoSocioResult;

    expect(respostaAtualizacaoVeiculo.statusCode).toEqual(200);
    expect(corpoRespostaAtualizacaoVeiculo.idSocio).toEqual(corpoRespostaAdicaoSocio.id);
    expect(corpoRespostaAtualizacaoVeiculo.placa).toEqual(placa);
  });
});

describe("Módulo API VeiculoSocio - AtualizarStatusAtivo", () => {
  test("Ao atualizar status do veículo de um sócio, deve ser retornado o novo status", async () => {

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
    
    const novoVeiculo = new AdicionarVeiculoSocioInput("ABC1234");

    const respostaAdicaoVeiculo = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
      .send(novoVeiculo)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoVeiculo = respostaAdicaoVeiculo.body.dados as AdicionarVeiculoSocioResult;

    const statusAtualizadoVeiculo = {
      status: false,
    }

    const respostaAtualizacaoStatusVeiculo = await Supertest(Servidor)
      .patch(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos/${corpoRespostaAdicaoVeiculo.id}`)
      .send(statusAtualizadoVeiculo)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAtualizacaoStatusVeiculo = respostaAtualizacaoStatusVeiculo.body.dados as VeiculoSocioStatusResult;

    expect(respostaAtualizacaoStatusVeiculo.statusCode).toEqual(200);
    expect(corpoRespostaAtualizacaoStatusVeiculo.id).toEqual(corpoRespostaAdicaoVeiculo.id);
    expect(corpoRespostaAtualizacaoStatusVeiculo.status).toEqual(false);

  });
});

describe("Módulo API VeiculoSocio - ObterVeiculoPorId", () => {
  test("Ao obter o veiculo de um sócio, deve ser retornado os dados do veículo", async () => {

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
    
    const placa = "ABC1234"
    
    const novoVeiculo = new AdicionarVeiculoSocioInput(placa);

    const respostaAdicaoVeiculo = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
      .send(novoVeiculo)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoVeiculo = respostaAdicaoVeiculo.body.dados as AdicionarVeiculoSocioResult;

    const respostaObtencaoVeiculo = await Supertest(Servidor)
      .get(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos/${corpoRespostaAdicaoVeiculo.id}`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaObtencaoVeiculo = respostaObtencaoVeiculo.body.dados as ObterVeiculoSocioResult;

    expect(respostaObtencaoVeiculo.statusCode).toEqual(200);
    expect(corpoRespostaObtencaoVeiculo.id).toEqual(corpoRespostaAdicaoVeiculo.id);
    expect(corpoRespostaObtencaoVeiculo.placa).toEqual(placa);
  });
});

describe("Módulo API VeiculoSocio - ObterVeiculosPorSocio", () => {
  test("Ao obter os veículos de um sócio caso existam veículos cadastrados, deve ser retornado os dados do veículo", async () => {

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
    
    const placa1 = "ABC1234"
    
    const novoVeiculo1 = new AdicionarVeiculoSocioInput(placa1);

    const respostaAdicaoVeiculo1 = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
      .send(novoVeiculo1)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const placa2 = "ABC5678"
    
    const novoVeiculo2 = new AdicionarVeiculoSocioInput(placa2);

    const respostaAdicaoVeiculo2 = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
      .send(novoVeiculo2)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const respostaObtencaoVeiculos = await Supertest(Servidor)
      .get(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaObtencaoVeiculos = respostaObtencaoVeiculos.body.dados as ObterVeiculoSocioResult[];

    expect(respostaObtencaoVeiculos.statusCode).toEqual(200);
    expect(corpoRespostaObtencaoVeiculos.at(0)!.idSocio).toEqual(corpoRespostaAdicaoSocio.id);
    expect(corpoRespostaObtencaoVeiculos.at(1)!.idSocio).toEqual(corpoRespostaAdicaoSocio.id);
    expect(corpoRespostaObtencaoVeiculos.at(0)!.placa).toEqual(placa1);
    expect(corpoRespostaObtencaoVeiculos.at(1)!.placa).toEqual(placa2);
  });

  test("Ao obter os veículos de um sócio caso não existam veículos cadastrados, deve ser retornado NoContent", async () => {

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

    const respostaObtencaoVeiculos = await Supertest(Servidor)
      .get(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    expect(respostaObtencaoVeiculos.noContent).toEqual(true);
  });
});