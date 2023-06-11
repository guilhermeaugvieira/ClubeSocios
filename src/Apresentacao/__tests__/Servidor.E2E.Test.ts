import Supertest from 'supertest'
import { Servidor } from "../Configuracoes/Servidor";
import { container } from "tsyringe";
import PrismaInstance from "../../PrismaInstance";
import { v4 as uuid } from 'uuid';
import { AdicionarColaboradorInput } from "../../Aplicacao/Modelos/Inputs/ColaboradorInput";
import { AdicionarClienteInput } from "../../Aplicacao/Modelos/Inputs/ClienteInput";
import { AdicionarPapelInput } from "../../Aplicacao/Modelos/Inputs/PapelInput";

const LimparBancoDeDados = async () => {
  await PrismaInstance.$transaction([
    PrismaInstance.veiculoSocio.deleteMany(),
    PrismaInstance.pagamentoSocio.deleteMany(),
    PrismaInstance.dependente.deleteMany(),
    PrismaInstance.endereco.deleteMany(),
    PrismaInstance.colaborador.deleteMany(),
    PrismaInstance.papel.deleteMany(),
    PrismaInstance.cliente.deleteMany(),
    PrismaInstance.socio.deleteMany(),
    PrismaInstance.plano.deleteMany(),
  ]);
}

afterEach(async () => {
  await LimparBancoDeDados();

  await PrismaInstance.$disconnect();

  container.clearInstances();
});

beforeAll(async () => {
  await LimparBancoDeDados();

  await PrismaInstance.$disconnect();

  container.clearInstances();
});

describe('Módulo API - Colaboradores', () => {

  test('Ao adicionar um novo usuário, especificando o cliente e o papel, o servidor deve retornar 201', async() => {
    const loginEsperado = 'testeLogin2';
    const nomeEsperado = 'teste';

    const novoColaborador = new AdicionarColaboradorInput(
      new AdicionarClienteInput(nomeEsperado, "00000000000", loginEsperado, "Ab2*bc32", "abc@email.com"),
      new AdicionarPapelInput("Administrador")
    );
    
    const resposta = await Supertest(Servidor)
      .post("/api/colaboradores")
      .send(novoColaborador)
      .set('Accept', 'application/json');

    const corpoResposta = resposta.body.dados;

    expect(resposta.statusCode).toBe(201);
    expect(corpoResposta.cliente.login).toEqual(loginEsperado.toUpperCase());
    expect(corpoResposta.cliente.nome).toEqual(nomeEsperado.toUpperCase());
  });

  test('Ao adicionar um novo usuário, especificando o cliente e o nome de um papel já existente, o servidor deve retornar 201', async() => {
    const loginEsperado = 'testeLogin2';
    const nomeEsperado = 'teste';

    const novoPapel = await PrismaInstance.papel.create({
      data: {
        Ativo: true,
        Nome: "ADMINISTRADOR",
        DataCriacao: new Date(),
        Id: uuid(),
        DataAtualizacao: null,
      }
    })

    const novoColaborador = new AdicionarColaboradorInput(
      new AdicionarClienteInput(nomeEsperado, "00000000000", loginEsperado, "Ab2*bc32", "abc@email.com"),
      new AdicionarPapelInput("Administrador")
    );
    
    const resposta = await Supertest(Servidor)
      .post("/api/colaboradores")
      .send(novoColaborador)
      .set('Accept', 'application/json');

    const corpoResposta = resposta.body.dados;

    expect(resposta.statusCode).toBe(201);
    expect(corpoResposta.cliente.login).toEqual(loginEsperado.toUpperCase());
    expect(corpoResposta.cliente.nome).toEqual(nomeEsperado.toUpperCase());
    expect(corpoResposta.papel.nome).toEqual(novoPapel.Nome);
  });

  test('Ao adicionar um novo usuário e logar, deve ser obtido o token e o servidor deve retornar 200', async() => {
    const loginEsperado = 'testeLogin2';
    const nomeEsperado = 'teste';

    const novoPapel = await PrismaInstance.papel.create({
      data: {
        Ativo: true,
        Nome: "ADMINISTRADOR",
        DataCriacao: new Date(),
        Id: uuid(),
        DataAtualizacao: null,
      }
    })

    const novoColaborador = new AdicionarColaboradorInput(
      new AdicionarClienteInput(nomeEsperado, "00000000000", loginEsperado, "Ab2*bc32", "abc@email.com"),
      new AdicionarPapelInput("Administrador")
    );
    
    await Supertest(Servidor)
      .post("/api/colaboradores")
      .send(novoColaborador)
      .set('Accept', 'application/json');

    
    const loginObject = {
      login: 'testeLogin2',
      senha: 'Ab2*bc32',
    }
    
    const resposta = await Supertest(Servidor)
      .post("/api/colaboradores/login")
      .send(loginObject)
      .set('Accept', 'application/json');

    const corpoResposta = resposta.body.dados;

    expect(resposta.statusCode).toBe(200);
    expect(corpoResposta).toContain("ey");
  });
});