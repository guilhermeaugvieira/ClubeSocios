import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarPlanoInput } from '../Modelos/Inputs/PlanoInput';

describe('Módulo AdicionarPlanoInput', () => {
  test('Ao validar plano com nome inválido, devem ser apresentadas todas as mensagens de erro relacionadas ao nome', () => {
    const errosEsperados = [
      'Nome do plano precisa ser preenchido',
      'Nome do plano precisa ter entre 5 a 40 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });
  
  test('Ao validar plano com descrição inválida, devem ser apresentadas todas as mensagens de erro relacionadas a descrição', () => {
    const errosEsperados = [
      'Descrição do plano precisa ser preenchido',
      'Descrição do plano precisa ter entre 10 a 256 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com tipo de recorrência inválida, devem ser apresentadas todas as mensagens de erro relacionadas ao tipo de recorrencia', () => {
    const errosEsperados = [
      'Tipo de Recorrência do plano precisa ser preenchida',
      'Tipo de Recorrência do plano precisa ter entre 3 a 15 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com modalidade inválida, devem ser apresentadas todas as mensagens de erro relacionadas a modalidade', () => {
    const errosEsperados = [
      'Modalidade do plano precisa ser preenchida',
      'Modalidade do plano precisa ter entre 5 a 30 caracteres'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com valor da mensalidade inválida, devem ser apresentadas todas as mensagens de erro relacionadas ao valor da mensalidade', () => {
    const errosEsperados = [
      'Valor da Mensalidade do plano precisa ser preenchida',
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar null, o input não deve ser construído', () => {
    const planoRecebido = null;

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);
      
    expect(novoPlano).toBe(null);
  });

  test('Ao validar undefined, o input não deve ser construído', () => {
    const planoRecebido = undefined;

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);
      
    expect(novoPlano).toBe(null);
  });
})