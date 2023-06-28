import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarClienteInput, AtualizarClienteInput } from '../Modelos/Inputs/ClienteInput';

describe('Módulo AdicionarClienteInput', () => {
  test('Ao validar cliente com login inválido, devem ser apresentadas as mensagens: Login do cliente precisa ser preenchido, Login do cliente deve conter entre 3 a 30 caracteres, Login do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Login do cliente precisa ser preenchido",
      "Login do cliente deve conter entre 3 a 30 caracteres",
      "Login do cliente precisa ser um texto",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const clienteRecebido = {
    };

    const novoCliente = AdicionarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar cliente com login preenchido com espaço, devem ser apresentada a mensagem: Login do cliente não pode conter espaço', () => {
    const errosEsperados = [
      "Login do cliente não pode conter espaço",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const clienteRecebido = {
      login: ' ',
    };

    const novoCliente = AdicionarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar cliente com senha inválida, devem ser apresentadas as mensagens: Senha do cliente precisa ser preenchida, Senha do cliente deve conter entre 8 a 30 caracteres, Senha do cliente deve conter ao menos um caracter especial, Senha do cliente deve conter ao menos um número, Senha do cliente deve conter ao menos uma letra maiúscula, Senha do cliente deve conter ao menos uma letra minúscula, Senha do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Senha do cliente precisa ser preenchida",
      "Senha do cliente deve conter entre 8 a 30 caracteres",
      "Senha do cliente deve conter ao menos um caracter especial",
      "Senha do cliente deve conter ao menos um número",
      "Senha do cliente deve conter ao menos uma letra maiúscula",
      "Senha do cliente deve conter ao menos uma letra minúscula",
      "Senha do cliente precisa ser um texto"
    ];
    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const clienteRecebido = {}

    const novoCliente = AdicionarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[3] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[4] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[5] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[6] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar cliente com email inválido, devem ser apresentadas as mensagens: Email do cliente precisa ser preenchido, Email do cliente deve conter entre 7 a 50 caracteres, Email do cliente deve conter "@", Email do cliente deve conter ".", Email do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Email do cliente precisa ser preenchido",
      "Email do cliente deve conter entre 7 a 50 caracteres",
      "Email do cliente deve conter '@'",
      "Email do cliente deve conter '.'",
      "Email do cliente precisa ser um texto",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const clienteRecebido = {}

    const novoCliente = AdicionarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[3] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[4] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar cliente com nome inválido, devem ser apresentadas as mensagens: Nome do cliente precisa ser preenchido, Nome do cliente deve conter entre 4 a 100 caracteres, Nome do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Nome do cliente precisa ser preenchido",
      "Nome do cliente deve conter entre 4 a 100 caracteres",
      "Nome do cliente precisa ser um texto",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const clienteRecebido = {}

    const novoCliente = AdicionarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar cliente com documento inválido, devem ser apresentadas as mensagens: Documento do cliente precisa ser preenchido, Documento do cliente deve conter 11 caracteres, Documento do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Documento do cliente precisa ser preenchido",
      "Documento do cliente deve conter 11 caracteres",
      "Documento do cliente precisa ser um texto"
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const clienteRecebido = {}

    const novoCliente = AdicionarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar valor nulo, o input não deve ser construido"', () => {
    const clienteRecebido = null;

    const novoCliente = AdicionarClienteInput.construirDoRequest(clienteRecebido);

    expect(novoCliente).toBeNull();
  });

  test('Ao validar undefined, o input não deve ser construido"', () => {
    const clienteRecebido = undefined;

    const novoCliente = AdicionarClienteInput.construirDoRequest(clienteRecebido);

    expect(novoCliente).toBeNull();
  });
});

describe('Módulo AtualizarClienteInput', () => {
  test('Ao validar cliente com login inválido, devem ser apresentadas as mensagens: Login do cliente precisa ser preenchido, Login do cliente deve conter entre 3 a 30 caracteres, Login do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Login do cliente precisa ser preenchido",
      "Login do cliente deve conter entre 3 a 30 caracteres",
      "Login do cliente precisa ser um texto"
    ];
    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const clienteRecebido = {
    };

    const novoCliente = AtualizarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar cliente com login preenchido com espaço, devem ser apresentadas as mensagens: Login do cliente não pode conter espaço', () => {
    const errosEsperados = [
      "Login do cliente não pode conter espaço",
    ];
    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const clienteRecebido = {
      login: ' ',
    };

    const novoCliente = AtualizarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });


  test('Ao validar cliente com email inválido, devem ser apresentadas as mensagens: Email do cliente precisa ser preenchido, Email do cliente deve conter entre 7 a 50 caracteres, Email do cliente deve conter "@", Email do cliente deve conter ".", Email do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Email do cliente precisa ser preenchido",
      "Email do cliente deve conter entre 7 a 50 caracteres",
      "Email do cliente deve conter '@'",
      "Email do cliente deve conter '.'",
      "Email do cliente precisa ser um texto"
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const clienteRecebido = {}

    const novoCliente = AtualizarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[3] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[4] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar cliente com nome inválido, devem ser apresentadas as mensagens: Nome do cliente precisa ser preenchido, Nome do cliente deve conter entre 4 a 100 caracteres, Nome do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Nome do cliente precisa ser preenchido",
      "Nome do cliente deve conter entre 4 a 100 caracteres",
      "Nome do cliente precisa ser um texto"
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const clienteRecebido = {}

    const novoCliente = AtualizarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar cliente com documento inválido, devem ser apresentadas as mensagens: Documento do cliente precisa ser preenchido, Documento do cliente deve conter 11 caracteres, Documento do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Documento do cliente precisa ser preenchido",
      "Documento do cliente deve conter 11 caracteres",
      "Documento do cliente precisa ser um texto"
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const clienteRecebido = {}

    const novoCliente = AtualizarClienteInput.construirDoRequest(clienteRecebido);

    const notificacoes = new Array<Notificacao>();

    novoCliente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar valor nulo, o input não deve ser construido"', () => {
    const clienteRecebido = null;

    const novoCliente = AtualizarClienteInput.construirDoRequest(clienteRecebido);

    expect(novoCliente).toBeNull();
  });

  test('Ao validar undefined, o input não deve ser construido"', () => {
    const clienteRecebido = undefined;

    const novoCliente = AtualizarClienteInput.construirDoRequest(clienteRecebido);

    expect(novoCliente).toBeNull();
  });
});
