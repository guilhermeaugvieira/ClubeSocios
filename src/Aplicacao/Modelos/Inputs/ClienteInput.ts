import { CONJUNTO_ALFABETO_MAIUSCULO, CONJUNTO_ALFABETO_MINUSCULO, CONJUNTO_CARACTERES_ESPECIAIS, CONJUNTO_NUMEROS } from "../../../Core/Constantes";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";

class AdicionarClienteInput{
  nome: string;
  documento: string;
  login: string;
  senha: string;
  email: string;

  constructor(nome: string, documento: string, login: string, senha: string, email: string){
    this.nome = nome;
    this.documento = documento;
    this.login = login;
    this.senha = senha;
    this.email = email;
  }

  static construirDoRequest = (cliente: any) : AdicionarClienteInput | null => {

    if(Validadores.ehValorInvalido(cliente))
      return null;

    const { nome, documento, login, senha, email } = cliente;

    return new AdicionarClienteInput(nome, documento, login, senha, email);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.login))
      notificacoes.push(new Notificacao("Login do cliente precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.login, 3, 30))
      notificacoes.push(new Notificacao("Login do cliente deve conter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.textoComUmDosCaracteres(this.login,[' ']))
      notificacoes.push(new Notificacao("Login do cliente não pode conter espaço", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.login, 'string'))
      notificacoes.push(new Notificacao("Login do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.senha))
      notificacoes.push(new Notificacao("Senha do cliente precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.senha, 8, 30))
      notificacoes.push(new Notificacao("Senha do cliente deve conter entre 8 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComUmDosCaracteres(this.senha, CONJUNTO_CARACTERES_ESPECIAIS))
      notificacoes.push(new Notificacao("Senha do cliente deve conter ao menos um caracter especial", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComUmDosCaracteres(this.senha, CONJUNTO_NUMEROS))
      notificacoes.push(new Notificacao("Senha do cliente deve conter ao menos um número", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComUmDosCaracteres(this.senha, CONJUNTO_ALFABETO_MAIUSCULO))
      notificacoes.push(new Notificacao("Senha do cliente deve conter ao menos uma letra maiúscula", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComUmDosCaracteres(this.senha, CONJUNTO_ALFABETO_MINUSCULO))
      notificacoes.push(new Notificacao("Senha do cliente deve conter ao menos uma letra minúscula", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.senha, 'string'))
      notificacoes.push(new Notificacao("Senha do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.email))
      notificacoes.push(new Notificacao("Email do cliente precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.email, 7, 50))
      notificacoes.push(new Notificacao("Email do cliente deve conter entre 7 a 50 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComUmDosCaracteres(this.email, ['@']))
      notificacoes.push(new Notificacao("Email do cliente deve conter '@'", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComUmDosCaracteres(this.email, ['.']))
      notificacoes.push(new Notificacao("Email do cliente deve conter '.'", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.email, 'string'))
      notificacoes.push(new Notificacao("Email do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.nome))
      notificacoes.push(new Notificacao("Nome do cliente precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.nome, 4, 100))
      notificacoes.push(new Notificacao("Nome do cliente deve conter entre 4 a 100 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.nome, 'string'))
      notificacoes.push(new Notificacao("Nome do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.documento))
      notificacoes.push(new Notificacao("Documento do cliente precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.documento, 11))
      notificacoes.push(new Notificacao("Documento do cliente deve conter 11 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.documento, 'string'))
      notificacoes.push(new Notificacao("Documento do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    return notificacoes;
  }
}

class AtualizarClienteInput {
  nome: string;
  documento: string;
  login: string;
  email: string;

  constructor(nome: string, documento: string, login: string, email: string){
    this.nome = nome;
    this.documento = documento;
    this.login = login;
    this.email = email;
  }

  static construirDoRequest = (cliente: any) : AtualizarClienteInput | null => {

    if(Validadores.ehValorInvalido(cliente))
      return null;

    const { nome, documento, login, email } = cliente;

    return new AtualizarClienteInput(nome, documento, login, email);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.login))
      notificacoes.push(new Notificacao("Login do cliente precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.login, 3, 30))
      notificacoes.push(new Notificacao("Login do cliente deve conter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.textoComUmDosCaracteres(this.login, [' ']))
      notificacoes.push(new Notificacao("Login do cliente não pode conter espaço", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.login, 'string'))
      notificacoes.push(new Notificacao("Login do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.email))
      notificacoes.push(new Notificacao("Email do cliente precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.email, 7, 50))
      notificacoes.push(new Notificacao("Email do cliente deve conter entre 7 a 50 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComUmDosCaracteres(this.email, ['@']))
      notificacoes.push(new Notificacao("Email do cliente deve conter '@'", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComUmDosCaracteres(this.email, ['.']))
      notificacoes.push(new Notificacao("Email do cliente deve conter '.'", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.email, 'string'))
      notificacoes.push(new Notificacao("Email do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.nome))
      notificacoes.push(new Notificacao("Nome do cliente precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.nome, 4, 100))
      notificacoes.push(new Notificacao("Nome do cliente deve conter entre 4 a 100 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.nome, 'string'))
      notificacoes.push(new Notificacao("Nome do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.documento))
      notificacoes.push(new Notificacao("Documento do cliente precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.documento, 11))
      notificacoes.push(new Notificacao("Documento do cliente deve conter 11 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.documento, 'string'))
      notificacoes.push(new Notificacao("Documento do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    return notificacoes;
  }
}

export { AdicionarClienteInput, AtualizarClienteInput }
