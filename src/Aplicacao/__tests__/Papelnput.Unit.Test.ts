import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarPapelInput, AtualizarPapelInput } from '../Modelos/Inputs/PapelInput';

describe('Módulo AdicionarPapelInput', () => {
  test('Ao validar papel com nome inválido, deve ser apresentada as mensagens: Nome do papel precisa ser preenchido, Nome do papel precisa conter entre 4 e 30 caracteres, Nome do papel precisa ser um texto', () => {
    const errosEsperados = [
      "Nome do papel precisa ser preenchido",
      "Nome do papel precisa conter entre 4 e 30 caracteres",
      "Nome do papel precisa ser um texto"
    ]

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const papelRecebido = {}

    const novoPapel = AdicionarPapelInput.construirDoRequest(papelRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPapel?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar valor nulo, o input não deve ser construido', () => {
    const papelRecebido = null;

    const novoPapel = AdicionarPapelInput.construirDoRequest(papelRecebido);

    expect(novoPapel).toBeNull();
  });

  test('Ao validar undefined, o input não deve ser construido', () => {
    const papelRecebido = undefined;

    const novoPapel = AdicionarPapelInput.construirDoRequest(papelRecebido);

    expect(novoPapel).toBeNull();
  });  
})

describe('Módulo AtualizarPapelInput', () => {
  test('Ao validar papel com nome inválido, deve ser apresentada as mensagens: Nome do papel precisa ser preenchido, Nome do papel precisa conter entre 4 e 30 caracteres, Nome do papel precisa ser um texto', () => {
    const errosEsperados = [
      "Nome do papel precisa ser preenchido",
      "Nome do papel precisa conter entre 4 e 30 caracteres",
      "Nome do papel precisa ser um texto"
    ]

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const papelRecebido = {}

    const novoPapel = AtualizarPapelInput.construirDoRequest(papelRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPapel?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar valor nulo, o input não deve ser construido', () => {
    const papelRecebido = null;

    const novoPapel = AtualizarPapelInput.construirDoRequest(papelRecebido);

    expect(novoPapel).toBeNull();
  });

  test('Ao validar undefined, o input não deve ser construido', () => {
    const papelRecebido = undefined;

    const novoPapel = AtualizarPapelInput.construirDoRequest(papelRecebido);

    expect(novoPapel).toBeNull();
  });  
})