import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarColaboradorInput, LoginColaboradorInput } from '../Modelos/Inputs/ColaboradorInput';

describe('Módulo AdicionarColaboradorInput', () => {
  test('Ao adicionar colaborador com id do Cliente com menos de 36 caracteres, deve ser apresentado a mensagem : O id do cliente precisa ter 36 caracteres', () => {
    const erroEsperado = "Id do cliente precisa ter 36 caracteres";
    const ticketRequisicao = uuid();

    const colaboradorRecebido = {
      idCliente: uuid().toString().substring(0,16),
      papel: {
        nome: 'ABC2',
      },
    }

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao)

    const notificacoesTotais = notificacoes.length;
    const notificacaoObtida = notificacoes.pop();

    expect(notificacoesTotais).toEqual(1);
    expect(notificacaoObtida?.Mensagem).toEqual(erroEsperado);
    expect(notificacaoObtida?.TipoErro).toEqual(TipoNotificacao.DadoIncorreto);
  });

  test('Ao adicionar colaborador com id do Papel com menos de 36 caracteres, deve ser apresentada a mensagem: O id do Papel precisa ter 36 caracteres', () => {
    const erroEsperado = "Id do Papel precisa ter 36 caracteres";
    const ticketRequisicao = uuid();

    const colaboradorRecebido = {
      idCliente: uuid(),
      idPapel: uuid().toString().substring(0,16),
    }

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao)

    const notificacoesTotais = notificacoes.length;
    const notificacaoObtida = notificacoes.pop();

    expect(notificacoesTotais).toEqual(1);
    expect(notificacaoObtida?.Mensagem).toEqual(erroEsperado);
    expect(notificacaoObtida?.TipoErro).toEqual(TipoNotificacao.DadoIncorreto);
  });

  test('Ao adicionar colaborador sem id do Cliente e as informações do cliente, devem ser apresentadas as mensagens: Se o id do cliente não é fornecido deve ser preenchido os dados do cliente, Id do cliente precisa ter 36 caracteres, Id do cliente precisa ser um texto', () => {
    const errosEsperados = [
      "Se o id do cliente não é fornecido deve ser preenchido os dados do cliente",
      "Id do cliente precisa ter 36 caracteres",
      "Id do cliente precisa ser um texto",
    ];
    const ticketRequisicao = uuid();

    const colaboradorRecebido = {
      papel: {
        nome: 'ABC2',
      },
    }

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao)

    expect(notificacoes.some(not => not.Mensagem === errosEsperados[0])).toEqual(true);
    expect(notificacoes.some(not => not.Mensagem === errosEsperados[1])).toEqual(true);
    expect(notificacoes.some(not => not.Mensagem === errosEsperados[2])).toEqual(true);
  });

  test('Ao adicionar colaborador com id do Cliente e as informações do cliente, deve ser apresentada a mensagem: Somente um dos dados referente ao cliente deve ser preenchido', () => {
    const erroEsperado = "Somente um dos dados referente ao cliente deve ser preenchido";
    const ticketRequisicao = uuid();

    const colaboradorRecebido = {
      idCliente: uuid(),
      cliente: {
        login: 'ABC',
        senha: 'ABC',
        email: 'ABC',
        nome: 'ABC',
        documento: '',
      },
      papel: {
        nome: 'ABC2',
      },
    }

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao)

    const notificacoesTotais = notificacoes.length;
    const notificacaoObtida = notificacoes.pop();

    expect(notificacoesTotais).toEqual(1);
    expect(notificacaoObtida?.Mensagem).toEqual(erroEsperado);
    expect(notificacaoObtida?.TipoErro).toEqual(TipoNotificacao.DadoIncorreto);
  });

  test('Ao adicionar colaborador sem id do Papel e informações do papel, devem ser apresentadas as mensagens: Se o id do papel não é fornecido deve ser preenchido os dados do papel, Id do Papel precisa ser um texto, Id do Papel precisa ter 36 caracteres', () => {
    const errosEsperados = [
      "Se o id do papel não é fornecido deve ser preenchido os dados do papel",
      "Id do Papel precisa ser um texto",
      "Id do Papel precisa ter 36 caracteres",
    ];
    const ticketRequisicao = uuid();

    const colaboradorRecebido = {
      idCliente: uuid(),
    }

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao)

    expect(notificacoes.some(not => not.Mensagem === errosEsperados[0])).toEqual(true);
    expect(notificacoes.some(not => not.Mensagem === errosEsperados[1])).toEqual(true);
    expect(notificacoes.some(not => not.Mensagem === errosEsperados[2])).toEqual(true);
  });

  test('Ao adicionar colaborador com id do Papel e informações do papel, deve ser apresentada a mensagem: Somente um dos dados referente ao papel deve ser preenchido', () => {
    const erroEsperado = "Somente um dos dados referente ao papel deve ser preenchido";
    const ticketRequisicao = uuid();

    const colaboradorRecebido = {
      idCliente: uuid(),
      idPapel: uuid(),
      papel: {
        nome: 'ABC2',
      },
    }

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao)

    const notificacoesTotais = notificacoes.length;
    const notificacaoObtida = notificacoes.pop();

    expect(notificacoesTotais).toEqual(1);
    expect(notificacaoObtida?.Mensagem).toEqual(erroEsperado);
    expect(notificacaoObtida?.TipoErro).toEqual(TipoNotificacao.DadoIncorreto);
  });

  test('Ao adicionar colaborador com as informações do cliente e papel inválidas, o cliente e o papel precisam ser validados', () => {
    const errosEsperados = [
      "Login do cliente precisa ser preenchido",
      "Login do cliente deve conter entre 3 a 30 caracteres",
      "Nome do papel precisa ser preenchido",
      "Nome do papel precisa conter entre 4 e 30 caracteres"
    ];

    const tipoErroEsperado = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const colaboradorRecebido = {
      cliente: {
        login: '',
        senha: 'Ab*aab23',
        email: 'ABC@email.com',
        nome: 'ABC2',
        documento: '00000000000',
      },
      papel: {
        nome: ''
      }
    }

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao)

    expect(notificacoes.some(not => not.Mensagem === errosEsperados[0] && not.TipoErro === tipoErroEsperado)).toEqual(true);
    expect(notificacoes.some(not => not.Mensagem === errosEsperados[1] && not.TipoErro === tipoErroEsperado)).toEqual(true);
    expect(notificacoes.some(not => not.Mensagem === errosEsperados[2] && not.TipoErro === tipoErroEsperado)).toEqual(true);
    expect(notificacoes.some(not => not.Mensagem === errosEsperados[3] && not.TipoErro === tipoErroEsperado)).toEqual(true);
    expect(notificacoes.length).toEqual(4);
  });

  test('Ao adicionar colaborador com as informações do papel inválida, o papel precisa ser validado', () => {
    const errosEsperados = [
      "Nome do papel precisa ser preenchido",
      "Nome do papel precisa conter entre 4 e 30 caracteres"
    ];

    const tipoErroEsperado = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const colaboradorRecebido = {
      idCliente: uuid(),
      papel: {
        nome: '',
      }
    }

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao)

    expect(notificacoes.some(not => not.Mensagem === errosEsperados[0] && not.TipoErro === tipoErroEsperado)).toEqual(true);
    expect(notificacoes.some(not => not.Mensagem === errosEsperados[1] && not.TipoErro === tipoErroEsperado)).toEqual(true);
    expect(notificacoes.length).toEqual(2);
  });

  test('Ao validar nulo , o novo colaborador não deve ser construído', () => {
    const colaboradorRecebido = null

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    expect(novoColaborador).toBeNull();
  });

  test('Ao validar undefined , o novo colaborador não deve ser construído', () => {
    const colaboradorRecebido = undefined;

    const novoColaborador = AdicionarColaboradorInput.construirDoRequest(colaboradorRecebido);

    expect(novoColaborador).toBeNull();
  });
});

describe('Módulo LoginColaboradorInput', () => {
  test('Ao validar colaborador com login inválido, devem ser apresentadas as mensagens: Login precisa ser preenchido, Login precisa ser um texto', () => {
    const errosEsperados = [
      "Login precisa ser preenchido",
      "Login precisa ser um texto",
    ]

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const colaboradorRecebido = {}

    const novoColaborador = LoginColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar colaborador com senha inválida, devem ser apresentadas as mensagens: Senha precisa ser preenchida, Senha precisa ser um texto', () => {
    const errosEsperados = [
      "Senha precisa ser preenchida",
      "Senha precisa ser um texto"
    ]

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const colaboradorRecebido = {}

    const novoColaborador = LoginColaboradorInput.construirDoRequest(colaboradorRecebido);

    const notificacoes = new Array<Notificacao>();

    novoColaborador?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar valor nulo, o input não deve ser construido', () => {
    const colaboradorRecebido = null;
    
    const novoColaborador = LoginColaboradorInput.construirDoRequest(colaboradorRecebido);

    expect(novoColaborador).toEqual(null);
  });

  test('Ao validar undefined, o input não deve ser construido', () => {
    const colaboradorRecebido = undefined;
    
    const novoColaborador = LoginColaboradorInput.construirDoRequest(colaboradorRecebido);

    expect(novoColaborador).toEqual(null);
  });
})