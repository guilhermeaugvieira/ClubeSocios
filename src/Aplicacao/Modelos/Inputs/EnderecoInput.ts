import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";

class AdicionarEnderecoInput { 

  pais: string;
  cidade: string;
  cep: string;
  bairro: string;
  rua: string;
  numero?: number | null = null;

  constructor(pais: string, cidade: string, cep: string, bairro: string, rua: string, numero?: number | null){
    this.pais = pais;
    this.cidade = cidade;
    this.cep = cep;
    this.bairro = bairro;
    this.rua = rua;
    this.numero = numero;
  }

  static construirDoRequest = (endereco: any) => {   
    if(Validadores.EhValorInvalido(endereco))
      return null;
    
    const { pais, cidade, cep, bairro, rua, numero } = endereco;

    return new AdicionarEnderecoInput(pais, cidade, cep, bairro, rua, numero);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.pais))
      notificacoes.push(new Notificacao("País precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.pais, 3, 30))
      notificacoes.push(new Notificacao("País precisa ter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.pais, 'string'))
      notificacoes.push(new Notificacao("País precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.cidade))
      notificacoes.push(new Notificacao("Cidade precisa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.cidade, 3, 30))
      notificacoes.push(new Notificacao("Cidade precisa ter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

      if(!Validadores.EhVariavelDoTipo(this.cidade, 'string'))
      notificacoes.push(new Notificacao("Cidade precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.cep))
      notificacoes.push(new Notificacao("Cep precisa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.cep, 9))
      notificacoes.push(new Notificacao("Cep precisa ter entre 9 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.cep, 'string'))
      notificacoes.push(new Notificacao("Cep precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.bairro))
      notificacoes.push(new Notificacao("Bairro precisa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.bairro, 5, 40))
      notificacoes.push(new Notificacao("Bairro precisa ter entre 5 a 40 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.bairro, 'string'))
      notificacoes.push(new Notificacao("Bairro precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.rua))
      notificacoes.push(new Notificacao("Rua precisa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.rua, 5, 40))
      notificacoes.push(new Notificacao("Rua precisa ter entre 5 a 40 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.rua, 'string'))
      notificacoes.push(new Notificacao("Rua precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhValorInvalido(this.numero) && !Validadores.EhNumeroMaiorQue(this.numero, 0))
      notificacoes.push(new Notificacao("Número precisa ser maior que 0", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhValorInvalido(this.numero) && !Validadores.EhVariavelDoTipo(this.numero, 'number'))
      notificacoes.push(new Notificacao("Número precisa ser um número", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    return notificacoes;
  }
}

class AtualizarEnderecoInput { 

  pais: string;
  cidade: string;
  cep: string;
  bairro: string;
  rua: string;
  numero?: number | null = null;

  constructor(pais: string, cidade: string, cep: string, bairro: string, rua: string, numero?: number | null){
    this.pais = pais;
    this.cidade = cidade;
    this.cep = cep;
    this.bairro = bairro;
    this.rua = rua;
    this.numero = numero;
  }

  static construirDoRequest = (endereco: any) => {   
    if(Validadores.EhValorInvalido(endereco))
      return null;
    
    const { pais, cidade, cep, bairro, rua, numero } = endereco;

    return new AtualizarEnderecoInput(pais, cidade, cep, bairro, rua, numero);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.pais))
      notificacoes.push(new Notificacao("País precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.pais, 3, 30))
      notificacoes.push(new Notificacao("País precisa ter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.pais, 'string'))
      notificacoes.push(new Notificacao("País precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.cidade))
      notificacoes.push(new Notificacao("Cidade precisa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.cidade, 3, 30))
      notificacoes.push(new Notificacao("Cidade precisa ter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.cidade, 'string'))
      notificacoes.push(new Notificacao("Cidade precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.cep))
      notificacoes.push(new Notificacao("Cep precisa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.cep, 9))
      notificacoes.push(new Notificacao("Cep precisa ter entre 9 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.cep, 'string'))
      notificacoes.push(new Notificacao("Cep precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.bairro))
      notificacoes.push(new Notificacao("Bairro precisa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.bairro, 5, 40))
      notificacoes.push(new Notificacao("Bairro precisa ter entre 5 a 40 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.bairro, 'string'))
      notificacoes.push(new Notificacao("Bairro precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.rua))
      notificacoes.push(new Notificacao("Rua precisa precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.rua, 5, 40))
      notificacoes.push(new Notificacao("Rua precisa ter entre 5 a 40 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.rua, 'string'))
      notificacoes.push(new Notificacao("Rua precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhValorInvalido(this.numero) && !Validadores.EhNumeroMaiorQue(this.numero, 0))
      notificacoes.push(new Notificacao("Número precisa ser maior que 0", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhValorInvalido(this.numero) && !Validadores.EhVariavelDoTipo(this.numero, 'number'))
      notificacoes.push(new Notificacao("Número precisa ser um número", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    return notificacoes;
  }
}

export { AdicionarEnderecoInput, AtualizarEnderecoInput }
