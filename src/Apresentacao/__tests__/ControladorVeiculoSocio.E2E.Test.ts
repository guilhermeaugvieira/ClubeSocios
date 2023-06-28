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
import { AdicionarVeiculoSocioResult, AtualizarVeiculoSocioResult, VeiculoSocioStatusResult } from "../../Aplicacao/Modelos/Results/VeiculoSocioResult";

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

describe("Módulo API VeiculoSocio - AtualizarPlano", () => {
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

describe("Módulo API VeiculoSocio - AtualizarPlano", () => {
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
    
    const novoVeiculo = new AdicionarVeiculoSocioInput("ABC1234");

    const respostaAdicaoVeiculo = await Supertest(Servidor)
      .post(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos`)
      .send(novoVeiculo)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAdicaoVeiculo = respostaAdicaoVeiculo.body.dados as AdicionarVeiculoSocioResult;

    const veiculoAtualizado = {
      status: false,
    }

    const respostaAtualizacaoStatusVeiculo = await Supertest(Servidor)
      .patch(`/api/socios/${corpoRespostaAdicaoSocio.id}/veiculos/${corpoRespostaAdicaoVeiculo.id}`)
      .send(veiculoAtualizado)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json');

    const corpoRespostaAtualizacaoStatusVeiculo = respostaAtualizacaoStatusVeiculo.body.dados as VeiculoSocioStatusResult;

    expect(respostaAtualizacaoStatusVeiculo.statusCode).toEqual(200);
    expect(corpoRespostaAtualizacaoStatusVeiculo.id).toEqual(corpoRespostaAdicaoVeiculo.id);
    expect(corpoRespostaAtualizacaoStatusVeiculo.status).toEqual(false);

  });
});