import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarEnderecoInput, AtualizarEnderecoInput } from '../Modelos/Inputs/EnderecoInput';

describe('Módulo AdicionarEnderecoInput', () => {
  test('Ao validar endereço com país inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao país', () => {
    const errosEsperados = [
      'País precisa ser preenchido',
      'País precisa ter entre 3 a 30 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com cidade inválida, devem ser apresentadas todas as mensagens de erro relacionadas a cidade', () => {
    const errosEsperados = [
      'Cidade precisa precisa ser preenchida',
      'Cidade precisa ter entre 3 a 30 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com cep inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao cep', () => {
    const errosEsperados = [
      'Cep precisa precisa ser preenchida',
      'Cep precisa ter entre 9 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com bairro inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao bairro', () => {
    const errosEsperados = [
      'Bairro precisa precisa ser preenchida',
      'Bairro precisa ter entre 5 a 40 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com rua inválida, devem ser apresentadas todas as mensagens de erro relacionadas a rua', () => {
    const errosEsperados = [
      'Rua precisa precisa ser preenchida',
      'Rua precisa ter entre 5 a 40 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com numero inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao numero', () => {
    const errosEsperados = [
      'Número precisa ser maior que 0'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {
      numero: "0",
    }

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar null, o input não deve ser construido', () => {
    const enderecoRecebido = null;

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);
      
    expect(novoEndereco).toEqual(null);
  });

  test('Ao validar undefined, o input não deve ser construido', () => {
    const enderecoRecebido = undefined;

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);
      
    expect(novoEndereco).toEqual(null);
  });
});

describe('Módulo AtualizarEnderecoInput', () => {
  test('Ao validar endereço com país inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao país', () => {
    const errosEsperados = [
      'País precisa ser preenchido',
      'País precisa ter entre 3 a 30 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com cidade inválida, devem ser apresentadas todas as mensagens de erro relacionadas a cidade', () => {
    const errosEsperados = [
      'Cidade precisa precisa ser preenchida',
      'Cidade precisa ter entre 3 a 30 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com cep inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao cep', () => {
    const errosEsperados = [
      'Cep precisa precisa ser preenchida',
      'Cep precisa ter entre 9 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com bairro inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao bairro', () => {
    const errosEsperados = [
      'Bairro precisa precisa ser preenchida',
      'Bairro precisa ter entre 5 a 40 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com rua inválida, devem ser apresentadas todas as mensagens de erro relacionadas a rua', () => {
    const errosEsperados = [
      'Rua precisa precisa ser preenchida',
      'Rua precisa ter entre 5 a 40 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com numero inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao numero', () => {
    const errosEsperados = [
      'Número precisa ser maior que 0'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {
      numero: "0",
    }

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar null, o input não deve ser construido', () => {
    const enderecoRecebido = null;

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);
      
    expect(novoEndereco).toEqual(null);
  });

  test('Ao validar undefined, o input não deve ser construido', () => {
    const enderecoRecebido = undefined;

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);
      
    expect(novoEndereco).toEqual(null);
  });
});