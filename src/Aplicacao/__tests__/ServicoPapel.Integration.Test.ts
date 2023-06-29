import 'reflect-metadata';
import { Notificador } from "../../Core/Notificador"
import { PrismaMock } from "../../PrismaMock";
import { v4 as uuid } from 'uuid';
import { mockReset } from 'jest-mock-extended';
import { Prisma } from '@prisma/client';
import { ServicoPapel } from '../Servicos/Implementacao/ServicoPapel';
import { RepositorioPapel } from '../../Dados/Repositorios/RepositorioPapel';
import { AdicionarPapelInput, AtualizarPapelInput } from '../Modelos/Inputs/PapelInput';

beforeEach(() => {
  mockReset(PrismaMock.papel);
  mockReset(PrismaMock.$transaction);
});

afterAll(() => {
  jest.restoreAllMocks();
})

describe("Módulo ServicoPapel - ObterPapelPorId", () => {
  test("Ao obter papel, especificando um id inexistente, deve retornar null", async () => {
    const erroEsperado = 'Papel não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPapel = new RepositorioPapel(PrismaMock);

    const servicoPapel = new ServicoPapel(notificador, PrismaMock, repositorioPapel);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.papel.findFirst.mockResolvedValueOnce(null);

    const result = await servicoPapel.obterPapelPorId(uuid(), ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});

describe("Módulo ServicoPapel - AdicionarPapel", () => {  
  test("Ao adicionar um novo papel, especificando um nome existente, deve retornar null", async () => {
    const erroEsperado = 'Papel já existe';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPapel = new RepositorioPapel(PrismaMock);

    const servicoPapel = new ServicoPapel(notificador, PrismaMock, repositorioPapel);

    const papelRecebido = new AdicionarPapelInput('Teste')

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.papel.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      Nome: 'Teste',
    });

    const result = await servicoPapel.adicionarPapel(papelRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});

describe("Módulo ServicoPapel - AtualizarPapel", () => {  
  test("Ao atualizar um papel, especificando um id inexistente, deve retornar null", async () => {
    const erroEsperado = 'Papel não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPapel = new RepositorioPapel(PrismaMock);

    const servicoPapel = new ServicoPapel(notificador, PrismaMock, repositorioPapel);

    const papelRecebido = new AtualizarPapelInput('Teste')

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.papel.findFirst.mockResolvedValueOnce(null);

    const result = await servicoPapel.atualizarPapel(uuid(), papelRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao atualizar um papel, especificando um nome existente, deve retornar null", async () => {
    const erroEsperado = 'Nome já é utilizado por outro papel';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPapel = new RepositorioPapel(PrismaMock);

    const servicoPapel = new ServicoPapel(notificador, PrismaMock, repositorioPapel);

    const papelRecebido = new AtualizarPapelInput('Teste')

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.papel.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      Nome: 'TESTE'
    });
    
    PrismaMock.papel.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      Nome: 'TESTE'
    });

    const result = await servicoPapel.atualizarPapel(uuid(), papelRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});

describe("Módulo ServicoPapel - AtualizarStatusDoPapel", () => {
  test("Ao atualizar status do papel, especificando um id inexistente, deve retornar null", async () => {
    const erroEsperado = 'Papel não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPapel = new RepositorioPapel(PrismaMock);

    const servicoPapel = new ServicoPapel(notificador, PrismaMock, repositorioPapel);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.papel.findFirst.mockResolvedValueOnce(null);

    const result = await servicoPapel.atualizarStatusPapel(uuid(), false, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao atualizar status do papel, especificando o status atual, deve retornar null", async () => {
    const erroEsperado = 'Papel já está com o status solicitado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPapel = new RepositorioPapel(PrismaMock);

    const servicoPapel = new ServicoPapel(notificador, PrismaMock, repositorioPapel);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.papel.findFirst.mockResolvedValueOnce({
      Id: uuid(),
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Nome: 'Teste',
    });

    const result = await servicoPapel.atualizarStatusPapel(uuid(), false, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});