import Supertest from 'supertest'
import { Servidor } from "../Configuracoes/Servidor";
import PrismaInstance from "../../PrismaInstance";
import { v4 as uuid } from 'uuid';
import { AdicionarColaboradorInput } from "../../Aplicacao/Modelos/Inputs/ColaboradorInput";
import { AdicionarClienteInput } from "../../Aplicacao/Modelos/Inputs/ClienteInput";
import { AdicionarPapelInput } from "../../Aplicacao/Modelos/Inputs/PapelInput";
import { LimparBancoDeDados } from '../../Dados/Utilidades/Funcoes';

afterEach(async () => {
  await LimparBancoDeDados();
});

describe('Módulo API Colaboradores - AdicionarColaborador', () => {

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

const ObterTokenAcessoParaTestes = async (nomePapel: string, nome: string, login: string, documento: string, email: string): Promise<string> => {
  const novoColaborador = new AdicionarColaboradorInput(
    new AdicionarClienteInput(nome, documento, login, "P@ssw0rd", email),
    new AdicionarPapelInput(nomePapel)
  );
  
  await Supertest(Servidor)
    .post("/api/colaboradores")
    .send(novoColaborador)
    .set('Accept', 'application/json');

  
  const loginObject = {
    login,
    senha: 'P@ssw0rd',
  }
  
  const resposta = await Supertest(Servidor)
    .post("/api/colaboradores/login")
    .send(loginObject)
    .set('Accept', 'application/json');

  return resposta.body.dados as string;
}

export { ObterTokenAcessoParaTestes }