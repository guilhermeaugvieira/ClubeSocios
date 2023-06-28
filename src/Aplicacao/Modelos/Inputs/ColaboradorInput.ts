import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { AdicionarClienteInput } from "./ClienteInput";
import { AdicionarPapelInput } from "./PapelInput";

class AdicionarColaboradorInput {
  idCliente?: string | null = null;
  cliente?: AdicionarClienteInput | null = null;
  idPapel?: string | null = null;
  papel?: AdicionarPapelInput | null = null;

  constructor(cliente?: AdicionarClienteInput | null, papel?: AdicionarPapelInput | null, 
    idCliente?: string | null, idPapel?: string | null){
    this.idCliente = idCliente;
    this.cliente = cliente;
    this.idPapel = idPapel;
    this.papel = papel;
  }

  static construirDoRequest = (colaborador: any) => {   
    if(Validadores.ehValorInvalido(colaborador))
      return null;
    
    const { idCliente, idPapel, cliente, papel} = colaborador;
    
    const novoCliente = AdicionarClienteInput.construirDoRequest(cliente);
    const novoPapel = AdicionarPapelInput.construirDoRequest(papel);
    
    return new AdicionarColaboradorInput(novoCliente, novoPapel, idCliente, idPapel);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.ehValorInvalido(this.cliente) && !Validadores.ehVariavelDoTipo(this.idCliente, 'string'))
      notificacoes.push(new Notificacao("Id do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
  
    if(Validadores.ehValorInvalido(this.cliente) && !Validadores.textoComComprimentoEntre(this.idCliente, 36))
      notificacoes.push(new Notificacao("Id do cliente precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.papel) && !Validadores.ehVariavelDoTipo(this.idPapel, 'string'))
      notificacoes.push(new Notificacao("Id do Papel precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.ehValorInvalido(this.papel) && !Validadores.textoComComprimentoEntre(this.idPapel, 36))
      notificacoes.push(new Notificacao("Id do Papel precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && Validadores.ehValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("Se o id do cliente não é fornecido deve ser preenchido os dados do cliente", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.ehValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("Somente um dos dados referente ao cliente deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.idPapel) && Validadores.ehValorInvalido(this.papel))
      notificacoes.push(new Notificacao("Se o id do papel não é fornecido deve ser preenchido os dados do papel", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehValorInvalidoOuEspacoEmBranco(this.idPapel) && !Validadores.ehValorInvalido(this.papel))
      notificacoes.push(new Notificacao("Somente um dos dados referente ao papel deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.ehValorInvalido(this.cliente))
      this.cliente!.validarModelo(notificacoes, ticketRequisicao);

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.idPapel) && !Validadores.ehValorInvalido(this.papel))
      this.papel!.validarModelo(notificacoes, ticketRequisicao);

    return notificacoes;
  }
}

class LoginColaboradorInput {
  login: string;
  senha: string;

  constructor(login: string, senha: string){
    this.login = login;
    this.senha = senha;
  }

  static construirDoRequest = (loginData: any): LoginColaboradorInput | null => {
    if(Validadores.ehValorInvalido(loginData))
      return null;

    const { login, senha } = loginData;

    return new LoginColaboradorInput(login, senha);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.login))
      notificacoes.push(new Notificacao("Login precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.login, 'string'))
      notificacoes.push(new Notificacao("Login precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.senha))
      notificacoes.push(new Notificacao("Senha precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.senha, 'string'))
      notificacoes.push(new Notificacao("Senha precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    return notificacoes;
  }
}

export { AdicionarColaboradorInput, LoginColaboradorInput }