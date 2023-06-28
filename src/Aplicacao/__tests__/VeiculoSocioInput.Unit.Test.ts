import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";
import { v4 as uuid } from "uuid";
import { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput } from "../Modelos/Inputs/VeiculoSocioInput";

describe("Módulo AdicionarVeiculoSocioInput", () => {
  test("Ao validar veículo com placa inválida, deve ser apresentada as mensagens: Placa precisa ser um texto, Placa precisa ser preenchida, Placa precisa ter 7 caracteres", () => {
    const errosEsperados = [
      "Placa precisa ser um texto",
      "Placa precisa ser preenchida",
      "Placa precisa ter 7 caracteres",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const veiculoRecebido = {};

    const novoVeiculo = AdicionarVeiculoSocioInput.construirDoRequest(veiculoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoVeiculo?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar veículo com placa inválida, deve ser apresentada as mensagens: Placa só pode conter números e letras maiúsculas", () => {
    const errosEsperados = [
      "Placa só pode conter números e letras maiúsculas",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const veiculoRecebido = {
      placa: 'abc'
    };

    const novoVeiculo = AdicionarVeiculoSocioInput.construirDoRequest(veiculoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoVeiculo?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar null, o input não deve ser construído", () => {
    const veiculoRecebido = null;

    const novoVeiculo = AdicionarVeiculoSocioInput.construirDoRequest(veiculoRecebido);

    expect(novoVeiculo).toEqual(null);
  });

  test("Ao validar undefined, o input não deve ser construído", () => {
    const veiculoRecebido = undefined;

    const novoVeiculo = AdicionarVeiculoSocioInput.construirDoRequest(veiculoRecebido);

    expect(novoVeiculo).toEqual(null);
  });
});

describe("Módulo AtualizarVeiculoSocioInput", () => {
  test("Ao validar veículo com placa inválida, deve ser apresentada as mensagens: Placa precisa ser um texto, Placa precisa ser preenchida, Placa precisa ter 7 caracteres", () => {
    const errosEsperados = [
      "Placa precisa ser um texto",
      "Placa precisa ser preenchida",
      "Placa precisa ter 7 caracteres",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const veiculoRecebido = {};

    const veiculoAtualizado = AtualizarVeiculoSocioInput.construirDoRequest(veiculoRecebido);

    const notificacoes = new Array<Notificacao>();

    veiculoAtualizado?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar veículo com placa inválida, deve ser apresentada as mensagens: Placa só pode conter números e letras maiúsculas", () => {
    const errosEsperados = [
      "Placa só pode conter números e letras maiúsculas",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const veiculoRecebido = {
      placa: 'abc'
    };

    const veiculoAtualizado = AtualizarVeiculoSocioInput.construirDoRequest(veiculoRecebido);

    const notificacoes = new Array<Notificacao>();

    veiculoAtualizado?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar null, o input não deve ser construído", () => {
    const veiculoRecebido = null;

    const veiculoAtualizado = AtualizarVeiculoSocioInput.construirDoRequest(veiculoRecebido);

    expect(veiculoAtualizado).toEqual(null);
  });

  test("Ao validar undefined, o input não deve ser construído", () => {
    const veiculoRecebido = undefined;

    const veiculoAtualizado = AtualizarVeiculoSocioInput.construirDoRequest(veiculoRecebido);

    expect(veiculoAtualizado).toEqual(null);
  });
});