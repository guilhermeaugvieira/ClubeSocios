import 'reflect-metadata';
import { Notificador } from "../../Core/Notificador"
import { RepositorioSocio } from "../../Dados/Repositorios/RepositorioSocio";
import { PrismaMock } from "../../PrismaMock";
import { v4 as uuid } from 'uuid';
import { mockReset } from 'jest-mock-extended';
import { RepositorioCliente } from '../../Dados/Repositorios/RepositorioCliente';
import { RepositorioDependente } from '../../Dados/Repositorios/RepositorioDependente';
import { ServicoDependente } from '../Servicos/Implementacao/ServicoDependente';
import { AdicionarDependenteInput, AtualizarDependenteInput } from '../Modelos/Inputs/DependenteInput';
import { AdicionarClienteInput } from '../Modelos/Inputs/ClienteInput';

beforeEach(() => {
  mockReset(PrismaMock.dependente);
  mockReset(PrismaMock.cliente);
  mockReset(PrismaMock.socio);
  mockReset(PrismaMock.$transaction);
});

afterAll(() => {
  jest.restoreAllMocks();
})

describe("Módulo ServicoDependente - AdicionarDependente", () => {
  test("Ao adicionar um novo dependente, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do socio fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const dependenteAdicionado = new AdicionarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
      uuid()
    );

    const resultado = await servicoDependente.adicionarDependente(dependenteAdicionado, uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao adicionar um novo dependente, especificando um id de cliente inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do cliente fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);

    const dependenteAdicionado = new AdicionarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
      uuid()
    );

    const resultado = await servicoDependente.adicionarDependente(dependenteAdicionado, uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao adicionar um novo dependente, especificando um id de cliente inexistente, deve retornar null", async () => {
    const erroEsperado = 'Cliente encontrado está inativo, para associação o cliente deve estar ativo';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'email',
      Id: uuid(),
      Login: 'teste',
      Nome: 'Alguém',
      Senha: 'senha',
    });

    const dependenteAdicionado = new AdicionarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
      uuid()
    );

    const resultado = await servicoDependente.adicionarDependente(dependenteAdicionado, uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao adicionar um novo dependente, especificando um id de cliente já associado a um dependente, deve retornar null", async () => {
    const erroEsperado = 'Já existe dependente associado ao cliente';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'email',
      Id: uuid(),
      Login: 'teste',
      Nome: 'Alguém',
      Senha: 'senha',
    });

    PrismaMock.dependente.findFirst.mockResolvedValueOnce({
      DataAtualizacao: null,
      DataCriacao: new Date(),
      FkCliente: uuid(),
      FkSocio: uuid(),
      Id: uuid(),
    })

    const dependenteAdicionado = new AdicionarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
      uuid()
    );

    const resultado = await servicoDependente.adicionarDependente(dependenteAdicionado, uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao adicionar um novo dependente, especificando um cliente com documento já cadastrado, deve retornar null", async () => {
    const erroEsperado = 'Já existe cliente com o documento fornecido';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'email',
      Id: uuid(),
      Login: 'teste',
      Nome: 'Alguém',
      Senha: 'senha',
    });

    const dependenteAdicionado = new AdicionarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
      null
    );

    const resultado = await servicoDependente.adicionarDependente(dependenteAdicionado, uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao adicionar um novo dependente, especificando um cliente com email já cadastrado, deve retornar null", async () => {
    const erroEsperado = 'Já existe cliente com o email cadastrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'email',
      Id: uuid(),
      Login: 'teste',
      Nome: 'Alguém',
      Senha: 'senha',
    });

    const dependenteAdicionado = new AdicionarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
      null
    );

    const resultado = await servicoDependente.adicionarDependente(dependenteAdicionado, uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao adicionar um novo dependente, especificando um cliente com login já cadastrado, deve retornar null", async () => {
    const erroEsperado = 'Já existe cliente com o login cadastrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'email',
      Id: uuid(),
      Login: 'teste',
      Nome: 'Alguém',
      Senha: 'senha',
    });

    const dependenteAdicionado = new AdicionarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
      null
    );

    const resultado = await servicoDependente.adicionarDependente(dependenteAdicionado, uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});

describe("Módulo ServicoDependente - AtualizarDependente", () => {
  test("Ao atualizar um dependente, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do socio fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const dependenteAtualizado = new AtualizarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
    );

    const resultado = await servicoDependente.atualizarDependente(dependenteAtualizado, uuid(), uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao atualizar um dependente, especificando um id de dependente inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do dependente fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.dependente.findFirst.mockResolvedValueOnce(null);

    const dependenteAtualizado = new AtualizarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
    );

    const resultado = await servicoDependente.atualizarDependente(dependenteAtualizado, uuid(), uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao atualizar um dependente, especificando um dependente que não pertence ao sócio, deve retornar null", async () => {
    const erroEsperado = 'Dependente não está associado ao sócio';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.dependente.findFirst.mockResolvedValueOnce({
      DataAtualizacao: null,
      DataCriacao: new Date(),
      FkCliente: uuid(),
      FkSocio: uuid(),
      Id: uuid(),
    });

    const dependenteAtualizado = new AtualizarDependenteInput(
      new AdicionarClienteInput('Alguém', '00000000000', 'testeteste', 'senha', 'email'),
    );

    const resultado = await servicoDependente.atualizarDependente(dependenteAtualizado, uuid(), uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });  
});

describe("Módulo ServicoDependente - AlterarStatusAtivo", () => {
  test("Ao atualizar o status de ativo de um dependente, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do socio fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoDependente.alterarStatusAtivo(ticketRequisicao, uuid(), uuid(), true);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao atualizar o status de ativo de um dependente, especificando um id de dependente inexistente, deve retornar null", async () => {
    const erroEsperado = 'Dependente não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.dependente.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoDependente.alterarStatusAtivo(ticketRequisicao, uuid(), uuid(), true);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});

describe("Módulo ServicoDependente - ObterDependentePorId", () => {
  test("Ao obter dependente por id, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do socio fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoDependente.obterDependentePorId(uuid(), uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });

  test("Ao obter dependente por id, especificando um id de dependente inexistente, deve retornar null", async () => {
    const erroEsperado = 'Dependente não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

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

    PrismaMock.dependente.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoDependente.obterDependentePorId(uuid(), uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});

describe("Módulo ServicoDependente - ObterDependentesPorSocio", () => {
  test("Ao obter dependente por socio, especificando um id de socio inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do socio fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioDependente = new RepositorioDependente(PrismaMock);

    const servicoDependente = new ServicoDependente(notificador, PrismaMock, repositorioCliente, repositorioDependente, repositorioSocio);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const resultado = await servicoDependente.obterDependentesPorSocio(uuid(), ticketRequisicao);

    const notificacao = notificador.obterNotificacoes(ticketRequisicao).pop();

    expect(resultado).toEqual(null);
    expect(notificacao!.Mensagem).toEqual(erroEsperado);
  });
});