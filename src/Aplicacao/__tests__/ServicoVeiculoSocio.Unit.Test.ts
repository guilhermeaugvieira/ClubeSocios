import 'reflect-metadata';
import { Notificador } from "../../Core/Notificador"
import { RepositorioSocio } from "../../Dados/Repositorios/RepositorioSocio";
import { PrismaMock } from "../../PrismaMock";
import { v4 as uuid } from 'uuid';
import { mockReset } from 'jest-mock-extended';
import { RepositorioVeiculoSocio } from '../../Dados/Repositorios/RepositorioVeiculoSocio';
import { ServicoVeiculoSocio } from '../Servicos/Implementacao/ServicoVeiculoSocio';
import { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput } from '../Modelos/Inputs/VeiculoSocioInput';
import { transformDocument } from '@prisma/client/runtime';

beforeEach(() => {
  mockReset(PrismaMock.veiculoSocio);
  mockReset(PrismaMock.socio);
  mockReset(PrismaMock.$transaction);
});

afterAll(() => {
  jest.restoreAllMocks();
})

describe("Módulo ServicoVeiculoSocio - AdicionarVeiculo", () => {
  test("Ao adicionar um novo sócio, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Sócio não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const veiculoAdicionado = new AdicionarVeiculoSocioInput('ABC1234');

    const resultado = await servicoVeiculo.adicionarVeiculo(veiculoAdicionado, ticketRequisicao, uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao adicionar um novo sócio, especificando uma placa já cadastrada, deve retornar null", async () => {
    const erroEsperado = 'Placa já foi cadastrada';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      FkSocio: uuid(),
      Placa: 'ABC',
    });

    const veiculoAdicionado = new AdicionarVeiculoSocioInput('ABC1234');

    const resultado = await servicoVeiculo.adicionarVeiculo(veiculoAdicionado, ticketRequisicao, uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});

describe("Módulo ServicoVeiculoSocio - AtualizarVeiculo", () => {
  test("Ao atualizar novo sócio, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Sócio não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const veiculoAdicionado = new AtualizarVeiculoSocioInput('ABC1234');

    const resultado = await servicoVeiculo.atualizarVeiculo(veiculoAdicionado, ticketRequisicao, uuid(), uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao atualizar novo sócio, especificando um id de veiculo inexistente, deve retornar null", async () => {
    const erroEsperado = 'Veículo não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce(null);

    const veiculoAdicionado = new AtualizarVeiculoSocioInput('ABC1234');

    const resultado = await servicoVeiculo.atualizarVeiculo(veiculoAdicionado, ticketRequisicao, uuid(), uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao atualizar novo sócio, especificando uma placa já existente, deve retornar null", async () => {
    const erroEsperado = 'Placa já foi cadastrada';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      FkSocio: uuid(),
      Placa: 'ABC',
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      FkSocio: uuid(),
      Placa: 'ABC1234',
    });

    const veiculoAdicionado = new AtualizarVeiculoSocioInput('ABC1234');

    const resultado = await servicoVeiculo.atualizarVeiculo(veiculoAdicionado, ticketRequisicao, uuid(), uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao atualizar novo sócio, especificando um id de veiculo não associado ao sócio, deve retornar null", async () => {
    const erroEsperado = 'Veículo não está associado ao sócio';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      FkSocio: uuid(),
      Placa: 'ABC',
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce(null);

    const veiculoAdicionado = new AtualizarVeiculoSocioInput('ABC1234');

    const resultado = await servicoVeiculo.atualizarVeiculo(veiculoAdicionado, ticketRequisicao, uuid(), uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});

describe("Módulo ServicoVeiculoSocio - AlterarStatusAtivo", () => {
  test("Ao alterar o status de ativo do veiculo, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do socio fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoVeiculo.alterarStatusAtivo(ticketRequisicao, uuid(), true, uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao alterar o status de ativo do veiculo, especificando um id de veiculo inexistente, deve retornar null", async () => {
    const erroEsperado = 'Veículo não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoVeiculo.alterarStatusAtivo(ticketRequisicao, uuid(), true, uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao alterar o status de ativo do veiculo, especificando o mesmo status, deve retornar null", async () => {
    const erroEsperado = 'Veículo já está habilitado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      FkSocio: uuid(),
      Placa: 'ABC',
    });

    const resultado = await servicoVeiculo.alterarStatusAtivo(ticketRequisicao, uuid(), true, uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao alterar o status de ativo do veiculo, especificando um veiculo não associado ao sócio, deve retornar null", async () => {
    const erroEsperado = 'Veículo não está associado ao sócio';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      FkSocio: uuid(),
      Placa: 'ABC',
    });

    const resultado = await servicoVeiculo.alterarStatusAtivo(ticketRequisicao, uuid(), false, uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});

describe("Módulo ServicoVeiculoSocio - ObterVeiculoPorId", () => {
  test("Ao obter o veículo por id, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do socio fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoVeiculo.obterVeiculoPorId(ticketRequisicao, uuid(), uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao obter o veículo por id, especificando um id de veiculo inexistente, deve retornar null", async () => {
    const erroEsperado = 'Veículo não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoVeiculo.obterVeiculoPorId(ticketRequisicao, uuid(), uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao obter o veículo por id, especificando um veiculo não associado ao sócio, deve retornar null", async () => {
    const erroEsperado = 'Veículo não está associado ao sócio';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Alguém',
      Contato: '35000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 28,
      Id: uuid(),
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
    });

    PrismaMock.veiculoSocio.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      FkSocio: uuid(),
      Placa: 'ABC',
    });

    const resultado = await servicoVeiculo.obterVeiculoPorId(ticketRequisicao, uuid(), uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});

describe("Módulo ServicoVeiculoSocio - ObterVeiculosDoSocio", () => {
  test("Ao obter o veículo por id, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do socio fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioVeiculoSocio = new RepositorioVeiculoSocio(PrismaMock);

    const servicoVeiculo = new ServicoVeiculoSocio(notificador, PrismaMock, repositorioSocio, repositorioVeiculoSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoVeiculo.obterVeiculosDoSocio(ticketRequisicao, uuid());

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});