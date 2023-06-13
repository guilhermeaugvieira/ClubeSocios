import 'reflect-metadata';
import { Notificador } from "../../Core/Notificador"
import { RepositorioPlano } from "../../Dados/Repositorios/RepositorioPlano";
import { PrismaMock } from "../../PrismaMock";
import { v4 as uuid } from 'uuid';
import { mockReset } from 'jest-mock-extended';
import { Prisma } from '@prisma/client';
import { AdicionarPlanoInput, AtualizarPlanoInput } from '../Modelos/Inputs/PlanoInput';
import { ServicoPlano } from '../Servicos/Implementacao/ServicoPlano';

beforeEach(() => {
  mockReset(PrismaMock.plano);
  mockReset(PrismaMock.$transaction);
});

afterAll(() => {
  jest.restoreAllMocks();
})

describe("Módulo ServicoPlano - ObterPlanoPorId", () => {
  test("Ao obter plano, especificando um id inexistente, deve retornar null", async () => {
    const erroEsperado = 'Plano não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);

    const servicoPlano = new ServicoPlano(notificador, PrismaMock, repositorioPlano);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.plano.findFirst.mockResolvedValueOnce(null);

    const result = await servicoPlano.obterPlanoPorId(uuid(), ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});

describe("Módulo ServicoPlano - AdicionarPlano", () => {  
  test("Ao adicionar um novo plano, especificando um nome existente, deve retornar null", async () => {
    const erroEsperado = 'Plano já existe';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);

    const servicoPlano = new ServicoPlano(notificador, PrismaMock, repositorioPlano);

    const planoRecebido = new AdicionarPlanoInput('Teste', 'descricao', 'Mensal', 0, 'Socio')

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.plano.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Descricao: 'teste',
      Id: uuid(),
      Modalidade: 'SOCIO',
      Nome: 'Teste',
      TipoRecorrencia: 'Mensal',
      ValorMensalidade: new Prisma.Decimal(0),
    });

    const result = await servicoPlano.adicionarPlano(planoRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});

describe("Módulo ServicoPlano - AtualizarPlano", () => {  
  test("Ao atualizar um plano, especificando um id inexistente, deve retornar null", async () => {
    const erroEsperado = 'Plano não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);

    const servicoPlano = new ServicoPlano(notificador, PrismaMock, repositorioPlano);

    const planoRecebido = new AtualizarPlanoInput('Teste', 'descricao', 'Mensal', 0, 'Socio')

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.plano.findFirst.mockResolvedValueOnce(null);

    const result = await servicoPlano.atualizarPlano(uuid(), planoRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});

describe("Módulo ServicoPlano - AtualizarStatusDoPlano", () => {
  test("Ao atualizar status do plano, especificando um id inexistente, deve retornar null", async () => {
    const erroEsperado = 'Plano não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);

    const servicoPlano = new ServicoPlano(notificador, PrismaMock, repositorioPlano);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.plano.findFirst.mockResolvedValueOnce(null);

    const result = await servicoPlano.atualizarStatusPlano(uuid(), false, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao atualizar status do plano, especificando o status atual, deve retornar null", async () => {
    const erroEsperado = 'Plano já está com o status solicitado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);

    const servicoPlano = new ServicoPlano(notificador, PrismaMock, repositorioPlano);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.plano.findFirst.mockResolvedValueOnce({
      Id: uuid(),
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Descricao: 'teste',
      Modalidade: 'Socio',
      Nome: 'Teste',
      TipoRecorrencia: 'Mensal',
      ValorMensalidade: new Prisma.Decimal(0)
    });

    const result = await servicoPlano.atualizarStatusPlano(uuid(), false, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});