import { v4 as uuid } from "uuid";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";
import { AdicionarDependenteInput, AtualizarDependenteInput } from "../Modelos/Inputs/DependenteInput";

describe("Módulo AdicionarDependenteInput", () => {
  test("Ao validar dependente sem dados, devem ser apresentadas as mensagens: Id do cliente precisa ser um texto, Id do cliente precisa ter 36 caracteres, Se o id do cliente não é fornecido deve ser preenchido os dados do cliente", () => {
    const errosEsperados = [
      "Id do cliente precisa ser um texto",
      "Id do cliente precisa ter 36 caracteres",
      "Se o id do cliente não é fornecido deve ser preenchido os dados do cliente",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const dependenteRecebido = {};

    const notificacoes = new Array<Notificacao>();

    const novoDependente = AdicionarDependenteInput.construirDoRequest(dependenteRecebido);

    novoDependente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar dependente com dados do cliente e id preenchidos, devem ser apresentadas as mensagens: Somente um dos dados referente ao cliente deve ser preenchido", () => {
    const errosEsperados = [
      "Somente um dos dados referente ao cliente deve ser preenchido"
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const dependenteRecebido = {
      idCliente: uuid(),
      cliente: {
      }
    };

    const notificacoes = new Array<Notificacao>();

    const novoDependente = AdicionarDependenteInput.construirDoRequest(dependenteRecebido);

    novoDependente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar dependente com dados do cliente, o cliente deve ser validado", () => {
    const errosEsperados = [
      "Login do cliente precisa ser preenchido"
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const dependenteRecebido = {
      cliente: {}
    };

    const notificacoes = new Array<Notificacao>();

    const novoDependente = AdicionarDependenteInput.construirDoRequest(dependenteRecebido);

    novoDependente?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar null, o input não deve ser construído", () => {

    const dependenteRecebido = null;

    const novoDependente = AdicionarDependenteInput.construirDoRequest(dependenteRecebido);

    expect(novoDependente).toEqual(null);
  });

  test("Ao validar undefined, o input não deve ser construído", () => {

    const dependenteRecebido = undefined;

    const novoDependente = AdicionarDependenteInput.construirDoRequest(dependenteRecebido);

    expect(novoDependente).toEqual(null);
  });
});

describe("Módulo AdicionarDependenteInput", () => {
  test("Ao validar dependente sem dados do cliente, devem ser apresentadas as mensagens: Deve ser preenchido os dados do cliente", () => {
    const errosEsperados = [
      "Deve ser preenchido os dados do cliente"
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const dependenteRecebido = {};

    const notificacoes = new Array<Notificacao>();

    const dependenteAtualizado = AtualizarDependenteInput.construirDoRequest(dependenteRecebido);

    dependenteAtualizado?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar dependente com dados do cliente, o cliente deve ser validado", () => {
    const errosEsperados = [
      "Login do cliente precisa ser preenchido"
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const dependenteRecebido = {
      cliente: {}
    };

    const notificacoes = new Array<Notificacao>();

    const dependenteAtualizado = AtualizarDependenteInput.construirDoRequest(dependenteRecebido);

    dependenteAtualizado?.validarModelo(notificacoes, ticketRequisicao);

    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test("Ao validar null, o input não deve ser construído", () => {

    const dependenteRecebido = null;

    const dependenteAtualizado = AtualizarDependenteInput.construirDoRequest(dependenteRecebido);

    expect(dependenteAtualizado).toEqual(null);
  });

  test("Ao validar undefined, o input não deve ser construído", () => {

    const dependenteRecebido = undefined;

    const dependenteAtualizado = AtualizarDependenteInput.construirDoRequest(dependenteRecebido);

    expect(dependenteAtualizado).toEqual(null);
  });
});