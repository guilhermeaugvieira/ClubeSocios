import { limparBancoDeDados } from "../../Dados/Utilidades/Funcoes";
import { ObterTokenAcessoParaTestes } from "./ControladorColaborador.E2E.Test";
import Supertest from 'supertest'
import { Servidor } from "../Configuracoes/Servidor";
import { v4 as uuid } from 'uuid';
import { AdicionarSocioInput } from "../../Aplicacao/Modelos/Inputs/SocioInput";
import { AdicionarEnderecoInput } from "../../Aplicacao/Modelos/Inputs/EnderecoInput";
import { AdicionarPlanoInput } from "../../Aplicacao/Modelos/Inputs/PlanoInput";
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
  test('Ao obter plano cadastrado pelo id e o plano for inexistente deve retornar 404', async () => {
    const tokenAcesso = await ObterTokenAcessoParaTestes("Administrador", "TesteSocio", "socio1234", "00000000001", "administrador@email.com");
    const erroEsperado = 'Plano não foi encontrado'
      
    const planoEncontrado = await Supertest(Servidor)
      .get(`/api/planos/${uuid()}`)
      .set('Authorization', tokenAcesso)
      .set('Accept', 'application/json'); 

    expect(planoEncontrado.status).toEqual(404);
    expect(planoEncontrado.body.erros[0]).toEqual(erroEsperado);
  });

  test('Ao obter plano cadastrado pelo id e o plano for existir deve retornar os dados do plano', async () => {
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