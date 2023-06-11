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
    if(Validadores.EhValorInvalido(colaborador))
      return null;
    
    const { idCliente, idPapel, cliente, papel} = colaborador;
    
    const novoCliente = AdicionarClienteInput.construirDoRequest(cliente);
    const novoPapel = AdicionarPapelInput.construirDoRequest(papel);
    
    return new AdicionarColaboradorInput(novoCliente, novoPapel, idCliente, idPapel);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.EhValorInvalido(this.cliente) && !Validadores.EhVariavelDoTipo(this.idCliente, 'string'))
      notificacoes.push(new Notificacao("Id do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
  
    if(Validadores.EhValorInvalido(this.cliente) && !Validadores.EhValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.TextoComComprimentoEntre(this.idCliente, 36))
      notificacoes.push(new Notificacao("Id do cliente precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalido(this.papel) && !Validadores.EhVariavelDoTipo(this.idPapel, 'string'))
      notificacoes.push(new Notificacao("Id do Papel precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.EhValorInvalido(this.papel) && !Validadores.EhValorInvalidoOuEspacoEmBranco(this.idPapel) && !Validadores.TextoComComprimentoEntre(this.idPapel, 36))
      notificacoes.push(new Notificacao("Id do Papel precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.idCliente) && Validadores.EhValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("Se o id do cliente não é fornecido deve ser preenchido os dados do cliente", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.EhValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("Somente um dos dados referente ao cliente deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.idPapel) && Validadores.EhValorInvalido(this.papel))
      notificacoes.push(new Notificacao("Se o id do papel não é fornecido deve ser preenchido os dados do papel", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhValorInvalidoOuEspacoEmBranco(this.idPapel) && !Validadores.EhValorInvalido(this.papel))
      notificacoes.push(new Notificacao("Somente um dos dados referente ao papel deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.EhValorInvalido(this.cliente))
      this.cliente!.validarModelo(notificacoes, ticketRequisicao);

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.idPapel) && !Validadores.EhValorInvalido(this.papel))
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
    if(Validadores.EhValorInvalido(loginData))
      return null;

    const { login, senha } = loginData;

    return new LoginColaboradorInput(login, senha);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.login))
      notificacoes.push(new Notificacao("Login precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.login, 'string'))
      notificacoes.push(new Notificacao("Login precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.senha))
      notificacoes.push(new Notificacao("Senha precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.senha, 'string'))
      notificacoes.push(new Notificacao("Senha precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    return notificacoes;
  }
}

export { AdicionarColaboradorInput, LoginColaboradorInput }