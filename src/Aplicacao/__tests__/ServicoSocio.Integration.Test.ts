import 'reflect-metadata';
import { Notificador } from "../../Core/Notificador"
import { RepositorioCliente } from "../../Dados/Repositorios/RepositorioCliente";
import { RepositorioEndereco } from "../../Dados/Repositorios/RepositorioEndereco";
import { RepositorioPlano } from "../../Dados/Repositorios/RepositorioPlano";
import { RepositorioSocio } from "../../Dados/Repositorios/RepositorioSocio";
import { Hash } from "../../Infra/Hash";
import { PrismaMock } from "../../PrismaMock";
import { AdicionarSocioInput, AtualizarSocioInput } from "../Modelos/Inputs/SocioInput";
import { ServicoSocio } from "../Servicos/Implementacao/ServicoSocio";
import { v4 as uuid } from 'uuid';
import { mockReset } from 'jest-mock-extended';
import { AdicionarClienteInput, AtualizarClienteInput } from '../Modelos/Inputs/ClienteInput';
import { Prisma } from '@prisma/client';
import { AdicionarPlanoInput } from '../Modelos/Inputs/PlanoInput';
import { AtualizarEnderecoInput } from '../Modelos/Inputs/EnderecoInput';

beforeEach(() => {
  mockReset(PrismaMock.cliente);
  mockReset(PrismaMock.endereco);
  mockReset(PrismaMock.plano);
  mockReset(PrismaMock.socio);
  mockReset(PrismaMock.$transaction);
});

afterAll(() => {
  jest.restoreAllMocks();
})

describe("Módulo ServicoSocio - AdicionarSocio", () => {
  test("Ao adicionar um novo sócio, especificando um id de cliente inexistente, deve retornar null", async () => {
    const erroEsperado = 'Id do cliente fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', 
      null, 'Teste', null, uuid(), null, null);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, especificando um id de cliente inativo, deve retornar null", async () => {
    const erroEsperado = 'Cliente encontrado está inativo, para associação o cliente deve estar ativo';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', 
      null, 'Teste', null, uuid(), null, null);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abcP4',
      Nome: 'Teste',
      Senha: Hash.criptografarTexto('P@ssw0rd'),
    });

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, especificando um id de cliente já utilizado por outro sócio, deve retornar null", async () => {
    const erroEsperado = 'Já existe socio associado ao cliente';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', 
      null, 'Teste', null, uuid(), null, null);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abcP4',
      Nome: 'Teste',
      Senha: Hash.criptografarTexto('P@ssw0rd'),
    });

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Teste',
      Contato: '00000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 2,
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
      Id: uuid()
    })

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, especificando um cliente com documento já existente, deve retornar null", async () => {
    const erroEsperado = 'Já existe cliente com o documento fornecido';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', null, 
      null, null, null, null, 
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', Hash.criptografarTexto("P@ssw0rd"), 'abc@email.com'));

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abcP4',
      Nome: 'Teste',
      Senha: Hash.criptografarTexto('P@ssw0rd'),
    });

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, especificando um cliente com email já existente, deve retornar null", async () => {
    const erroEsperado = 'Já existe cliente com o email cadastrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', null, 
      null, null, null, null, 
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', Hash.criptografarTexto("P@ssw0rd"), 'abc@email.com'));

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);
    
    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abcP4',
      Nome: 'Teste',
      Senha: Hash.criptografarTexto('P@ssw0rd'),
    });

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, especificando um cliente com login já existente, deve retornar null", async () => {
    const erroEsperado = 'Já existe cliente com o login cadastrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', null, 
      null, null, null, null, 
      new AdicionarClienteInput('Teste', '00000000000', 'Teste', Hash.criptografarTexto("P@ssw0rd"), 'abc@email.com'));

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);
    
    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);
    
    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abcP4',
      Nome: 'Teste',
      Senha: Hash.criptografarTexto('P@ssw0rd'),
    });

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, ao procurar um plano pelo id e não encontrar, deve retornar null", async () => {
    const erroEsperado = 'Id do plano fornecido não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', null, 
      null, uuid(), null, null, null);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.plano.findFirst.mockResolvedValueOnce(null);

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, ao procurar um plano pelo id e encontrar um plano inativo, deve retornar null", async () => {
    const erroEsperado = 'O sócio deve estar associado a um plano ativo';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', null, 
      null, uuid(), null, null, null);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.plano.findFirst.mockResolvedValueOnce({
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Descricao: 'Teste',
      Id: uuid(),
      Modalidade: 'Teste',
      Nome: 'Teste',
      TipoRecorrencia: 'Teste',
      ValorMensalidade: new Prisma.Decimal(1)
    });

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, ao procurar um plano pelo nome e encontrar um plano inativo, deve retornar null", async () => {
    const erroEsperado = 'Já existe plano com o nome informado e está inativo, o sócio deve estar associado a um plano ativo';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', null, null, null, null, 
      new AdicionarPlanoInput("Teste", "Teste", "Teste", 0, "Teste"), null);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.plano.findFirst.mockResolvedValueOnce({
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Descricao: 'Teste',
      Id: uuid(),
      Modalidade: 'Teste',
      Nome: 'Teste',
      TipoRecorrencia: 'Teste',
      ValorMensalidade: new Prisma.Decimal(1)
    });

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao adicionar um novo sócio, ao procurar um plano pelo nome e encontrar um plano inativo, deve retornar null", async () => {
    const erroEsperado = 'Já existe sócio com o contato fornecido';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AdicionarSocioInput(1, '00000000000', null, null, null, null, null, null);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: "Teste",
      Contato: '00000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 1,
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
      Id: uuid(),
    })

    const result = await servicoSocio.adicionarSocio(socioRecebido, ticketRequisicao);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
})

describe("Módulo ServicoSocio - AtualizarSocio", () => {
  test("Ao atualizar sócio com id do sócio inexistente deve apresentar a mensagem 'Sócio não foi encontrado'", async() => {
    const erroEsperado = 'Sócio não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AtualizarSocioInput(1, '000000000', 'Teste', 
      new AtualizarEnderecoInput('Brasil', 'Teste', '00000-000', 'Teste', 'Teste'),
      new AtualizarClienteInput('Teste', '00000000000', 'Teste', 'abc@email.com'),
      'Teste'
    );

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const result = await servicoSocio.atualizarSocio(socioRecebido, ticketRequisicao, uuid());

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao atualizar sócio com contato existente deve apresentar a mensagem 'Já existe sócio com o contato registrado'", async() => {
    const erroEsperado = 'Já existe sócio com o contato registrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AtualizarSocioInput(1, '000000000', 'Teste', 
      new AtualizarEnderecoInput('Brasil', 'Teste', '00000-000', 'Teste', 'Teste'),
      new AtualizarClienteInput('Teste', '00000000000', 'Teste', 'abc@email.com'),
      'Teste'
    );
    
    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Teste',
      Contato: '000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 1,
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
      Id: uuid(),
    });

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Teste',
      Contato: '000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 1,
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
      Id: uuid(),
    });

    const result = await servicoSocio.atualizarSocio(socioRecebido, ticketRequisicao, uuid());

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao atualizar sócio com nome de plano inexistente deve apresentar a mensagem 'Plano não foi encontrado'", async() => {
    const erroEsperado = 'Plano não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AtualizarSocioInput(1, '000000000', 'Teste', 
      new AtualizarEnderecoInput('Brasil', 'Teste', '00000-000', 'Teste', 'Teste'),
      new AtualizarClienteInput('Teste', '00000000000', 'Teste', 'abc@email.com'),
      'Teste'
    );
    
    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Teste',
      Contato: '000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 1,
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
      Id: uuid(),
    });

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    PrismaMock.plano.findFirst.mockResolvedValueOnce(null);

    const result = await servicoSocio.atualizarSocio(socioRecebido, ticketRequisicao, uuid());

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test("Ao atualizar sócio com nome de plano inativo deve apresentar a mensagem 'Plano especificado está inativo'", async() => {
    const erroEsperado = 'Plano especificado está inativo';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    const socioRecebido = new AtualizarSocioInput(1, '000000000', 'Teste', 
      new AtualizarEnderecoInput('Brasil', 'Teste', '00000-000', 'Teste', 'Teste'),
      new AtualizarClienteInput('Teste', '00000000000', 'Teste', 'abc@email.com'),
      'Teste'
    );
    
    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce({
      Apelido: 'Teste',
      Contato: '000000000',
      DataAtualizacao: null,
      DataCriacao: new Date(),
      DiaVencimentoPagamento: 1,
      FkCliente: uuid(),
      FkEndereco: uuid(),
      FkPlano: uuid(),
      Id: uuid(),
    });

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    PrismaMock.plano.findFirst.mockResolvedValueOnce({
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Descricao: 'Teste',
      Id: uuid(),
      Modalidade: "Teste",
      Nome: "Teste",
      TipoRecorrencia: "Teste",
      ValorMensalidade: new Prisma.Decimal(1),
    });

    const result = await servicoSocio.atualizarSocio(socioRecebido, ticketRequisicao, uuid());

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
});

describe("Módulo ServicoSocio - AlterarStatusAtivo", () => {
  test("Ao atualizar sócio com id do sócio inexistente deve apresentar a mensagem 'Sócio não foi encontrado'", async() => {
    const erroEsperado = 'Sócio não foi encontrado';
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioPlano = new RepositorioPlano(PrismaMock);
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioSocio = new RepositorioSocio(PrismaMock);
    const repositorioEndereco = new RepositorioEndereco(PrismaMock);

    const servicoSocio = new ServicoSocio(notificador, PrismaMock, repositorioPlano,
      repositorioCliente, repositorioSocio, repositorioEndereco);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.socio.findFirst.mockResolvedValueOnce(null);

    const result = await servicoSocio.alterarStatusAtivo(ticketRequisicao, uuid(), true);

    expect(result).toEqual(null);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.obterNotificacoes(ticketRequisicao).length).toEqual(1);
  });
})