import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarEnderecoInput, AtualizarEnderecoInput } from '../Modelos/Inputs/EnderecoInput';

describe('Módulo AdicionarEnderecoInput', () => {
  test('Ao validar endereço com país inválido, devem ser apresentadas as mensagens: País precisa ser preenchido, País precisa ter entre 3 a 30 caracteres, País precisa ser um texto', () => {
    const errosEsperados = [
      'País precisa ser preenchido',
      'País precisa ter entre 3 a 30 caracteres',
      'País precisa ser um texto'
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

  test('Ao validar endereço com cidade inválida, devem ser apresentadas as mensagens: Cidade precisa precisa ser preenchida, Cidade precisa ter entre 3 a 30 caracteres, Cidade precisa ser um texto', () => {
    const errosEsperados = [
      'Cidade precisa precisa ser preenchida',
      'Cidade precisa ter entre 3 a 30 caracteres',
      'Cidade precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com cep inválido, devem ser apresentadas as mensagens: Cep precisa precisa ser preenchida, Cep precisa ter entre 9 caracteres, Cep precisa ser um texto', () => {
    const errosEsperados = [
      'Cep precisa precisa ser preenchida',
      'Cep precisa ter entre 9 caracteres',
      'Cep precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com bairro inválido, devem ser apresentadas as mensagens: Bairro precisa ser preenchido, Bairro precisa ter entre 5 a 40 caracteres, Bairro precisa ser um texto', () => {
    const errosEsperados = [
      'Bairro precisa ser preenchido',
      'Bairro precisa ter entre 5 a 40 caracteres',
      'Bairro precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com rua inválida, devem ser apresentadas as mensagens: Rua precisa precisa ser preenchida, Rua precisa ter entre 5 a 40 caracteres, Rua precisa ser um texto', () => {
    const errosEsperados = [
      'Rua precisa precisa ser preenchida',
      'Rua precisa ter entre 5 a 40 caracteres',
      'Rua precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com numero inválido, devem ser apresentadas as mensagens: Número precisa ser maior que 0, Número precisa ser um número', () => {
    const errosEsperados = [
      'Número precisa ser maior que 0',
      'Número precisa ser um número',
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
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
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
  test('Ao validar endereço com país inválido, devem ser apresentadas as mensagens: País precisa ser preenchido, País precisa ter entre 3 a 30 caracteres, País precisa ser um texto', () => {
    const errosEsperados = [
      'País precisa ser preenchido',
      'País precisa ter entre 3 a 30 caracteres',
      'País precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com cidade inválida, devem ser apresentadas as mensagens: Cidade precisa precisa ser preenchida, Cidade precisa ter entre 3 a 30 caracteres, Cidade precisa ser um texto', () => {
    const errosEsperados = [
      'Cidade precisa precisa ser preenchida',
      'Cidade precisa ter entre 3 a 30 caracteres',
      'Cidade precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com cep inválido, devem ser apresentadas as mensagens: Cep precisa precisa ser preenchida, Cep precisa ter entre 9 caracteres, Cep precisa ser um texto', () => {
    const errosEsperados = [
      'Cep precisa precisa ser preenchida',
      'Cep precisa ter entre 9 caracteres',
      'Cep precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com bairro inválido, devem ser apresentadas as mensagens: Bairro precisa ser preenchido, Bairro precisa ter entre 5 a 40 caracteres, Bairro precisa ser um texto', () => {
    const errosEsperados = [
      'Bairro precisa ser preenchido',
      'Bairro precisa ter entre 5 a 40 caracteres',
      'Bairro precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com rua inválida, devem ser apresentadas as mensagens: Rua precisa precisa ser preenchida, Rua precisa ter entre 5 a 40 caracteres, Rua precisa ser um texto', () => {
    const errosEsperados = [
      'Rua precisa precisa ser preenchida',
      'Rua precisa ter entre 5 a 40 caracteres',
      'Rua precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const enderecoRecebido = {}

    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(enderecoRecebido);

    const notificacoes = new Array<Notificacao>();

    novoEndereco?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar endereço com numero inválido, devem ser apresentadas as mensagens: Número precisa ser maior que 0, Número precisa ser um número', () => {
    const errosEsperados = [
      'Número precisa ser maior que 0',
      'Número precisa ser um número'
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
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
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