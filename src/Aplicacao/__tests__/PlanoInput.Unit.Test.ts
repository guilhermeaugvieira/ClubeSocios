import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarPlanoInput, AtualizarPlanoInput } from '../Modelos/Inputs/PlanoInput';

describe('Módulo AdicionarPlanoInput', () => {
  test('Ao validar plano com nome inválido, devem ser apresentadas as mensagens: Nome do plano precisa ser preenchido, Nome do plano precisa ter entre 5 a 40 caracteres, Nome do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Nome do plano precisa ser preenchido',
      'Nome do plano precisa ter entre 5 a 40 caracteres',
      'Nome do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });
  
  test('Ao validar plano com descrição inválida, devem ser apresentadas as mensagens: Descrição do plano precisa ser preenchido, Descrição do plano precisa ter entre 10 a 256 caracteres, Descrição do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Descrição do plano precisa ser preenchido',
      'Descrição do plano precisa ter entre 10 a 256 caracteres',
      'Descrição do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com tipo de recorrência inválida, devem ser apresentadas as mensagens: Tipo de Recorrência do plano precisa ser preenchida, Tipo de Recorrência do plano precisa ter entre 3 a 15 caracteres, Tipo de Recorrencia do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Tipo de Recorrência do plano precisa ser preenchida',
      'Tipo de Recorrência do plano precisa ter entre 3 a 15 caracteres',
      'Tipo de Recorrencia do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com modalidade inválida, devem ser apresentadas as mensagens: Modalidade do plano precisa ser preenchida, Modalidade do plano precisa ter entre 5 a 30 caracteres, Modalidade do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Modalidade do plano precisa ser preenchida',
      'Modalidade do plano precisa ter entre 5 a 30 caracteres',
      'Modalidade do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AdicionarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com valor da mensalidade inválida, devem ser apresentadas as mensagens: Valor da Mensalidade do plano precisa ser preenchida, Valor da Mensalidade do plano precisa ser um número', () => {
    const errosEsperados = [
      'Valor da Mensalidade do plano precisa ser preenchida',
      'Valor da Mensalidade do plano precisa ser um número'
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

describe('Módulo AtualizarPlanoInput', () => {
  test('Ao validar plano com nome inválido, devem ser apresentadas as mensagens: Nome do plano precisa ser preenchido, Nome do plano precisa ter entre 5 a 40 caracteres, Nome do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Nome do plano precisa ser preenchido',
      'Nome do plano precisa ter entre 5 a 40 caracteres',
      'Nome do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AtualizarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });
  
  test('Ao validar plano com descrição inválida, devem ser apresentadas as mensagens: Descrição do plano precisa ser preenchido, Descrição do plano precisa ter entre 10 a 256 caracteres, Descrição do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Descrição do plano precisa ser preenchido',
      'Descrição do plano precisa ter entre 10 a 256 caracteres',
      'Descrição do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AtualizarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com tipo de recorrência inválida, devem ser apresentadas as mensagens: Tipo de Recorrência do plano precisa ser preenchida, Tipo de Recorrência do plano precisa ter entre 3 a 15 caracteres, Tipo de Recorrencia do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Tipo de Recorrência do plano precisa ser preenchida',
      'Tipo de Recorrência do plano precisa ter entre 3 a 15 caracteres',
      'Tipo de Recorrencia do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AtualizarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com modalidade inválida, devem ser apresentadas as mensagens: Modalidade do plano precisa ser preenchida, Modalidade do plano precisa ter entre 5 a 30 caracteres, Modalidade do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Modalidade do plano precisa ser preenchida',
      'Modalidade do plano precisa ter entre 5 a 30 caracteres',
      'Modalidade do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AtualizarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar plano com valor da mensalidade inválida, devem ser apresentadas as mensagens: Valor da Mensalidade do plano precisa ser preenchida, Valor da Mensalidade do plano precisa ser um número', () => {
    const errosEsperados = [
      'Valor da Mensalidade do plano precisa ser preenchida',
      'Valor da Mensalidade do plano precisa ser um número'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const planoRecebido = {}

    const novoPlano = AtualizarPlanoInput.construirDoRequest(planoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPlano?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar null, o input não deve ser construído', () => {
    const planoRecebido = null;

    const novoPlano = AtualizarPlanoInput.construirDoRequest(planoRecebido);
      
    expect(novoPlano).toBe(null);
  });

  test('Ao validar undefined, o input não deve ser construído', () => {
    const planoRecebido = undefined;

    const novoPlano = AtualizarPlanoInput.construirDoRequest(planoRecebido);
      
    expect(novoPlano).toBe(null);
  });
})