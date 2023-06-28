import { v4 as uuid } from 'uuid';
import { Notificacao, TipoNotificacao } from '../../Core/Notificacao';
import { AdicionarSocioInput, AtualizarSocioInput } from '../Modelos/Inputs/SocioInput';

describe('Módulo AdicionarSocioInput', () => {
  test('Ao validar socio com dia de vencimento do pagamento inválido, devem ser apresentadas as mensagens: Dia de Vencimento do Pagamento do Sócio precisa ser preenchido, Dia de Vencimento do Pagamento do Sócio precisa ser maior que 0, Dia de Vencimento do Pagamento do Sócio precisa ser menor que 28, Dia de Vencimento do Pagamento do Sócio precisa ser um número', () => {
    const errosEsperados = [
      'Dia de Vencimento do Pagamento do Sócio precisa ser preenchido',
      'Dia de Vencimento do Pagamento do Sócio precisa ser maior que 0',
      'Dia de Vencimento do Pagamento do Sócio precisa ser menor que 28',
      'Dia de Vencimento do Pagamento do Sócio precisa ser um número'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {}

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[3] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio com contato inválido, devem ser apresentadas as mensagens: Contato do Sócio precisa ser preenchido, Contato do Sócio precisa ter entre 11 a 15 caracteres, Contato do Sócio precisa ser um texto', () => {
    const errosEsperados = [
      'Contato do Sócio precisa ser preenchido',
      'Contato do Sócio precisa ter entre 11 a 15 caracteres',
      'Contato do Sócio precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {}

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio com apelido inválido, devem ser apresentadas as mensagens: Apelido do Sócio se preenchido precisa ter entre 3 a 30 caracteres', () => {
    const errosEsperados = [
      'Apelido do Sócio se preenchido precisa ter entre 3 a 30 caracteres',
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: 'ab',
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio sem id do cliente e informação do cliente vazia, devem ser apresentadas as mensagens: Id do cliente precisa ter 36 caracteres, Id do cliente precisa ser um texto, Se os dados do cliente não são preenchidos o id do cliente precisa ser fornecido', () => {
    const errosEsperados = [
      'Id do cliente precisa ter 36 caracteres',
      'Id do cliente precisa ser um texto',
      'Se os dados do cliente não são preenchidos o id do cliente precisa ser fornecido',
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      idPlano: uuid(),
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 1,
      }
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);

  });

  test('Ao validar socio com id do cliente e informação do cliente, devem ser apresentadas as mensagens: Somente um dos dados referente ao cliente deve ser preenchido', () => {
    const errosEsperados = [
      'Somente um dos dados referente ao cliente deve ser preenchido',
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      idCliente: uuid(),
      idPlano: uuid(),
      cliente: {},
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 1,
      }
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio sem id do plano e informação do plano vazia, devem ser apresentadas as mensagens: Id do plano precisa ter 36 caracteres, Id do plano precisa ser um texto, Se os dados do plano não são preenchidos o id do plano precisa ser fornecido', () => {
    const errosEsperados = [
      'Id do plano precisa ter 36 caracteres',
      'Id do plano precisa ser um texto',
      'Se os dados do plano não são preenchidos o id do plano precisa ser fornecido',
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      idCliente: uuid(),
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 1,
      }
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio com id do plano e informação do plano, devem ser apresentadas as mensagens: Somente um dos dados referente ao plano deve ser preenchido', () => {
    const errosEsperados = [
      'Somente um dos dados referente ao plano deve ser preenchido',
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      idCliente: uuid(),
      idPlano: uuid(),
      plano: {},
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 1,
      }
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao não enviar as informações do endereço, deve ser apresentado o erro "O preenchimento do endereço é obrigatório"', () => {
    const errosEsperados = [
      'O preenchimento do endereço é obrigatório'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      idPlano: uuid(),
      idCliente: uuid(),
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio sem id do cliente e informação do cliente preenchida, as informações do cliente devem ser validadas"', () => {
    const errosEsperados = [
      "Login do cliente precisa ser preenchido",
      "Login do cliente deve conter entre 3 a 30 caracteres",
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      idPlano: uuid(),
      cliente: {
        login: '',
        senha: 'Ab*aab23',
        email: 'ABC@email.com',
        nome: 'ABC2',
        documento: '00000000000',
      },
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 1,
      }
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao enviar as informações do plano e não enviar o id, as informações do plano devem ser validadas', () => {
    const errosEsperados = [
      'Valor da Mensalidade do plano precisa ser preenchida',
      'Valor da Mensalidade do plano precisa ser um número'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      idCliente: uuid(),
      plano: {
        nome: 'Mensal',
        descricao: 'abc123659875',
        tipoRecorrencia: 'mensal',
        modalidade: 'socio proprietario',
      },
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 1,
      }
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao enviar as informações do endereço, as informações do endereco devem ser validadas', () => {
    const errosEsperados = [
      'Número precisa ser maior que 0'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      idPlano: uuid(),
      idCliente: uuid(),
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 0,
      }
    }

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar null, o input não deve ser construído', () => {
    const socioRecebido = null;

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);
      
    expect(novoSocio).toEqual(null);
  });

  test('Ao validar undefined, o input não deve ser construído', () => {
    const socioRecebido = undefined;

    const novoSocio = AdicionarSocioInput.construirDoRequest(socioRecebido);
      
    expect(novoSocio).toEqual(null);
  });

});

describe('Módulo AtualizarSocioInput', () => {
  test('Ao validar socio com dia de vencimento do pagamento inválido, devem ser apresentadas as mensagens: Dia de Vencimento do Pagamento do Sócio precisa ser preenchido, Dia de Vencimento do Pagamento do Sócio precisa ser maior que 0, Dia de Vencimento do Pagamento do Sócio precisa ser menor que 28, Dia de Vencimento do Pagamento do Sócio precisa ser um número', () => {
    const errosEsperados = [
      'Dia de Vencimento do Pagamento do Sócio precisa ser preenchido',
      'Dia de Vencimento do Pagamento do Sócio precisa ser maior que 0',
      'Dia de Vencimento do Pagamento do Sócio precisa ser menor que 28',
      'Dia de Vencimento do Pagamento do Sócio precisa ser um número'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {}

    const novoSocio = AtualizarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[3] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio com contato inválido, devem ser apresentadas as mensagens: Contato do Sócio precisa ser preenchido, Contato do Sócio precisa ter entre 11 a 15 caracteres, Contato do Sócio precisa ser um texto', () => {
    const errosEsperados = [
      'Contato do Sócio precisa ser preenchido',
      'Contato do Sócio precisa ter entre 11 a 15 caracteres',
      'Contato do Sócio precisa ser um texto',
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {}

    const novoSocio = AtualizarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio com apelido inválido, devem ser apresentadas as mensagens: Apelido do Sócio se preenchido precisa ter entre 3 a 30 caracteres', () => {
    const errosEsperados = [
      'Apelido do Sócio se preenchido precisa ter entre 3 a 30 caracteres',
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: 'ab',
    }

    const novoSocio = AtualizarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar socio sem nome do plano, devem ser apresentadas as mensagens: Nome do plano precisa ser preenchido, Nome do plano precisa ter entre 5 a 40 caracteres, Nome do plano precisa ser um texto', () => {
    const errosEsperados = [
      'Nome do plano precisa ser preenchido',
      'Nome do plano precisa ter entre 5 a 40 caracteres',
      'Nome do plano precisa ser um texto'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 1,
      },
      cliente: {
        login: 'abc',
        email: 'abc@email.com',
        nome: 'Teste',
        documento: '00000000000'
      }
    }

    const novoSocio = AtualizarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[1] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[2] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao não enviar as informações do endereço, deve ser apresentado o erro "O preenchimento do endereço é obrigatório"', () => {
    const errosEsperados = [
      'O preenchimento do endereço é obrigatório'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      nomePlano: 'Mensal',
      cliente: {
        login: 'abc',
        email: 'abc@email.com',
        nome: 'Teste',
        documento: '00000000000'
      }
    }

    const novoSocio = AtualizarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao não enviar as informações do cliente, deve ser apresentado o erro "O preenchimento do cliente é obrigatório"', () => {
    const errosEsperados = [
      'O preenchimento do cliente é obrigatório'
    ];

    const tipoNotificacaoEsperada = TipoNotificacao.DadoIncorreto;
    const ticketRequisicao = uuid();

    const socioRecebido = {
      apelido: '',
      diaVencimentoPagamento: 2,
      contato: '12012345789',
      nomePlano: 'Mensal 1',
      endereco: {
        pais: 'Brasil',
        cidade: 'Teste',
        cep: '00000-000',
        bairro: 'Teste',
        rua: 'Travessa',
        numero: 1,
      }
    }

    const novoSocio = AtualizarSocioInput.construirDoRequest(socioRecebido);

    const notificacoes = new Array<Notificacao>();

    novoSocio?.validarModelo(notificacoes, ticketRequisicao);
      
    expect(notificacoes.some(erro => erro.Mensagem === errosEsperados[0] && erro.TipoErro === tipoNotificacaoEsperada)).toEqual(true);
  });

  test('Ao validar null, o input não deve ser construído', () => {
    const socioRecebido = null;

    const novoSocio = AtualizarSocioInput.construirDoRequest(socioRecebido);
      
    expect(novoSocio).toEqual(null);
  });

  test('Ao validar undefined, o input não deve ser construído', () => {
    const socioRecebido = undefined;

    const novoSocio = AtualizarSocioInput.construirDoRequest(socioRecebido);
      
    expect(novoSocio).toEqual(null);
  });

});