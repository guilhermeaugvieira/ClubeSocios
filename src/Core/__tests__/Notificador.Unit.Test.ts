import { Notificacao, TipoNotificacao } from '../Notificacao';
import { Notificador } from '../Notificador';
import { v4 as uuid } from 'uuid';

describe('Módulo Notificador', () => {
  test('Ao adicionar notificação com mensagem diferente de espaço em branco, o método TemNotificação deve retornar true', () => {
    const mensagemEsperada = 'Erro Teste';
    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const notificador = new Notificador();

    notificador.adicionarNotificacao(new Notificacao(mensagemEsperada, tipoNotificacaoEsperada, this, ticketRequisicao));

    expect(notificador.temNotificacao(ticketRequisicao)).toBe(true);
  });

  test('Ao adicionar notificação com mensagem preenchida com espaço em branco, o método TemNotificação deve retornar false', () => {
    const mensagemEsperada = '';
    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const notificador = new Notificador();

    notificador.adicionarNotificacao(new Notificacao(mensagemEsperada, tipoNotificacaoEsperada, this, ticketRequisicao));

    expect(notificador.temNotificacao(ticketRequisicao)).toBe(false);
  });

  test('Ao adicionar notificação com mensagem diferente de espaço em branco, o método obterNotificacoes deve retornar os dados inseridos', () => {
    const mensagemEsperada = 'Erro Teste';
    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const notificador = new Notificador();

    notificador.adicionarNotificacao(new Notificacao(mensagemEsperada, tipoNotificacaoEsperada, this, ticketRequisicao));

    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.Mensagem).toBe(mensagemEsperada);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.TipoErro).toBe(tipoNotificacaoEsperada);
    expect(notificador.obterNotificacoes(ticketRequisicao).pop()?.TicketRequisicao).toBe(ticketRequisicao);
  });

  test('Ao adicionar notificações de diferentes requisições, ambas com mensagem diferente de espaço em branco, o método obterNotificacoes deve retornar os dados do ticket informado somente', () => {
    const mensagemEsperada = 'Erro Teste';
    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();
    const ticketRequisicao2 = uuid();

    const notificador = new Notificador();

    notificador.adicionarNotificacao(new Notificacao(mensagemEsperada, tipoNotificacaoEsperada, this, ticketRequisicao));
    notificador.adicionarNotificacao(new Notificacao(mensagemEsperada, tipoNotificacaoEsperada, this, ticketRequisicao2));

    expect(notificador.obterNotificacoes(ticketRequisicao).every(not => not.TicketRequisicao === ticketRequisicao)).toBe(true);
  });

  test('Ao limpar notificações de uma requisição, somente as requisições da requisição devem ser removidas', () => {
    const mensagemEsperada = 'Erro Teste';
    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();
    const ticketRequisicao2 = uuid();

    const notificador = new Notificador();

    notificador.adicionarNotificacao(new Notificacao(mensagemEsperada, tipoNotificacaoEsperada, this, ticketRequisicao));
    notificador.adicionarNotificacao(new Notificacao(mensagemEsperada, tipoNotificacaoEsperada, this, ticketRequisicao2));

    notificador.limparNotificacoesRequisicao(ticketRequisicao);

    expect(notificador.temNotificacao(ticketRequisicao)).toBe(false);
    expect(notificador.temNotificacao(ticketRequisicao2)).toBe(true);
  });


});