import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarPapelInput } from '../Modelos/Inputs/PapelInput';

describe('Módulo AdicionarPapelInput', () => {
  test('Ao validar papel com nome inválido, deve ser apresentada todas as mensagens de erro referentes ao nome', () => {
    const errosEsperados = [
      "Nome do papel precisa ser preenchido",
      "Nome do papel precisa conter entre 4 e 30 caracteres"
    ]

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;

    const ticketRequisicao = uuid();

    const papelRecebido = {}

    const novoPapel = AdicionarPapelInput.construirDoRequest(papelRecebido);

    const notificacoes = new Array<Notificacao>();

    novoPapel?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
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