import 'reflect-metadata';
import { Notificador } from "../../Core/Notificador";
import { Hash } from "../../Infra/Hash";
import { PrismaMock } from "../../PrismaMock";
import { AdicionarColaboradorInput, LoginColaboradorInput } from "../Modelos/Inputs/ColaboradorInput";
import { ServicoColaborador } from "../Servicos/Implementacao/ServicoColaborador";
import { v4 as uuid} from 'uuid';
import { AdicionarPapelInput } from '../Modelos/Inputs/PapelInput';
import { mockReset } from 'jest-mock-extended';
import { AdicionarClienteInput } from '../Modelos/Inputs/ClienteInput';
import { RepositorioCliente } from '../../Dados/Repositorios/RepositorioCliente';
import { RepositorioPapel } from '../../Dados/Repositorios/RepositorioPapel';
import { RepositorioColaborador } from '../../Dados/Repositorios/RepositorioColaborador';

describe('Modulo ServicoColaborador', () => {

  beforeEach(() => {
    mockReset(PrismaMock.cliente);
    mockReset(PrismaMock.papel)
    mockReset(PrismaMock.colaborador);
    mockReset(PrismaMock.$transaction);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  })

  test('Ao adicionar um novo usuário, especificando um id de cliente inexistente, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "Id do Cliente fornecido não foi encontrado";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);

    const inputColaborador = new AdicionarColaboradorInput(
      null,
      null,
      uuid(),
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);

    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao adicionar um novo usuário, especificando um id de cliente inativo, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "Cliente deve estar ativo para fazer associação";
    const ticketRequisicao = uuid();
    
    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new AdicionarColaboradorInput(
      null,
      null,
      uuid(),
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));
  
    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: false,
      DataCriacao: new Date(),
      DataAtualizacao: null,
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abc2456',
      Nome: 'Teste',
      Senha: Hash.CriptografarTexto('P@ssw0rd'),
    });

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);

    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao adicionar um novo usuário, especificando um cliente com o documento já fornecido, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "Já existe cliente com o documento fornecido";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new AdicionarColaboradorInput(
      new AdicionarClienteInput("Teste", "00000000000", "Teste", "ABc23*ar4", "abc@email.com"),
      null,
      null,
      uuid()
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));
  
    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abc234de',
      Nome: 'Teste',
      Senha: Hash.CriptografarTexto('abc23A*b35')
    });

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);
    
    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao adicionar um novo usuário, especificando um cliente com o email já cadastrado, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "Já existe cliente com o email cadastrado";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new AdicionarColaboradorInput(
      new AdicionarClienteInput("Teste", "00000000000", "Teste", "ABc23*ar4", "abc@email.com"),
      null,
      null,
      uuid()
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));
  
    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);
    
    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abc234de',
      Nome: 'Teste',
      Senha: Hash.CriptografarTexto('abc23A*b35'),
    });

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);
    
    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao adicionar um novo usuário, especificando um cliente com o login já cadastrado, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "Já existe cliente com o login cadastrado";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new AdicionarColaboradorInput(
      new AdicionarClienteInput("Teste", "00000000000", "Teste", "ABc23*ar4", "abc@email.com"),
      null,
      null,
      uuid()
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

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
      Login: 'abc234de',
      Nome: 'Teste',
      Senha: Hash.CriptografarTexto('P@ssw0rd'),
    });

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);
    
    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao adicionar um novo usuário, especificando um id de papel inexistente, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "Id do Papel fornecido não foi encontrado";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new AdicionarColaboradorInput(
      null,
      null,
      null,
      uuid()
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.papel.findFirst.mockResolvedValueOnce(null);

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);

    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao adicionar um novo usuário, especificando um id de papel inativo, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "O papel informado pelo id se encontra inativo, o colaborador deve estar associado a um papel ativo";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new AdicionarColaboradorInput(
      null,
      null,
      null,
      uuid()
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.papel.findFirst.mockResolvedValueOnce({
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      Nome: "ADMINISTRADOR"
    });

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);

    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao adicionar um novo usuário, especificando um nome de papel inativo, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "Já existe papel com o nome informado e se encontra inativo, o colaborador deve estar associado a um papel ativo";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new AdicionarColaboradorInput(
      null,
      new AdicionarPapelInput("Administrador"),
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));
  
    PrismaMock.papel.findFirst.mockResolvedValueOnce(
      {
        Ativo: false,
        DataCriacao: new Date(),
        DataAtualizacao: null,
        Id: uuid(),
        Nome: "ADMINISTRADOR"
      }
    );

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);
    
    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });  
  
  test('Ao adicionar um novo usuário, especificando um papel e um cliente já associados, o método AdicionarColaborador deve retornar null', async() => {   
    const erroEsperado = "Colaborador já está associado ao papel";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new AdicionarColaboradorInput(
      null,
      null,
      uuid(),
      uuid()
    );

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));
  
    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'abc234de',
      Nome: 'Teste',
      Senha: 'abc23A*b35'
    });

    PrismaMock.papel.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Id: uuid(),
      Nome: 'Teste'
    }),
    
    PrismaMock.colaborador.findFirst.mockResolvedValueOnce({
      DataAtualizacao: null,
      DataCriacao: new Date(),
      FkCliente: uuid(),
      FkPapel: uuid(),
      Id: uuid(),
    });

    const addResult = await servicoColaborador.AdicionarColaborador(inputColaborador, ticketRequisicao);
    
    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao realizar o login, especificando um usuário inexistente, o método LoginColaborador deve retornar null', async() => {   
    const erroEsperado = "Usuário ou senha incorreta";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new LoginColaboradorInput("guiAbc23", "ABc2654*");

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce(null);

    const addResult = await servicoColaborador.LoginColaborador(inputColaborador, ticketRequisicao);
    
    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao realizar o login, especificando um usuário bloqueado, o método LoginColaborador deve retornar null', async() => {   
    const erroEsperado = "Usuário bloqueado";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new LoginColaboradorInput("guiAbc23", "ABc2654*");

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: false,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'TesteUser',
      Nome: 'Teste',
      Senha: Hash.CriptografarTexto('ABc2654*'),
    });

    const addResult = await servicoColaborador.LoginColaborador(inputColaborador, ticketRequisicao);
    
    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

  test('Ao realizar o login, especificando um usuário sem privilégios, o método LoginColaborador deve retornar null', async() => {   
    const erroEsperado = "Seu usuário não possui privilégios";
    const ticketRequisicao = uuid();

    const notificador = new Notificador();
    const repositorioCliente = new RepositorioCliente(PrismaMock);
    const repositorioPapel = new RepositorioPapel(PrismaMock);
    const repositorioColaborador = new RepositorioColaborador(PrismaMock);
    
    const inputColaborador = new LoginColaboradorInput("guiAbc23", "ABc2654*");

    const servicoColaborador = new ServicoColaborador(
      notificador, PrismaMock, repositorioCliente, repositorioPapel, repositorioColaborador);

    PrismaMock.$transaction.mockImplementationOnce(callback => callback(PrismaMock));

    PrismaMock.cliente.findFirst.mockResolvedValueOnce({
      Ativo: true,
      DataAtualizacao: null,
      DataCriacao: new Date(),
      Documento: '00000000000',
      Email: 'abc@email.com',
      Id: uuid(),
      Login: 'TesteUser',
      Nome: 'Teste',
      Senha: Hash.CriptografarTexto('ABc2654*'),
    });

    PrismaMock.colaborador.findMany.mockResolvedValueOnce([]);

    const addResult = await servicoColaborador.LoginColaborador(inputColaborador, ticketRequisicao);
    
    expect(addResult).toEqual(null);
    expect(notificador.ObterNotificacoes(ticketRequisicao).pop()?.Mensagem).toEqual(erroEsperado);
    expect(notificador.ObterNotificacoes(ticketRequisicao).length).toEqual(1);
  });

})