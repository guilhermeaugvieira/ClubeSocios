import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { AdicionarClienteInput, AtualizarClienteInput } from "./ClienteInput";
import { AdicionarEnderecoInput, AtualizarEnderecoInput } from "./EnderecoInput";
import { AdicionarPlanoInput } from "./PlanoInput";

class AdicionarSocioInput {
  
  apelido?: string | null = null;
  diaVencimentoPagamento: number;
  contato: string;

  idPlano?: string | null;
  plano?: AdicionarPlanoInput | null;
  
  idCliente?: string | null;
  cliente?: AdicionarClienteInput | null;

  endereco: AdicionarEnderecoInput | null;

  constructor(diaVencimentoPagamento: number, contato: string, endereco: AdicionarEnderecoInput | null, apelido?: string | null, 
    idPlano?: string | null, idCliente?: string | null, plano?: AdicionarPlanoInput | null, 
    cliente?: AdicionarClienteInput | null)
  {
    this.apelido = apelido;
    this.diaVencimentoPagamento = diaVencimentoPagamento;
    this.contato = contato;

    this.idPlano = idPlano;
    this.idCliente = idCliente;

    this.plano = plano;
    this.cliente = cliente;
    this.endereco = endereco;
  }

  static construirDoRequest = (socio: any) => {   
    if(Validadores.EhValorInvalido(socio))
      return null;
    
    const { apelido, diaVencimentoPagamento, contato, idPlano, idCliente, plano, cliente, endereco } = socio;

    const novoCliente = AdicionarClienteInput.construirDoRequest(cliente);
    const novoPlano = AdicionarPlanoInput.construirDoRequest(plano);
    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(endereco);

    return new AdicionarSocioInput(diaVencimentoPagamento, contato, novoEndereco, apelido, idPlano, idCliente, novoPlano, novoCliente);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.EhValorInvalido(this.diaVencimentoPagamento))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(!Validadores.EhNumeroMaiorQue(this.diaVencimentoPagamento, 0))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser maior que 0", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhNumeroMenorQue(this.diaVencimentoPagamento, 28))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser menor que 28", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.diaVencimentoPagamento, 'number'))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser um número", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.contato))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.contato, 11, 15))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ter entre 11 a 15 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.contato, 'string'))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(!Validadores.EhValorInvalidoOuEspacoEmBranco(this.apelido) && !Validadores.TextoComComprimentoEntre(this.apelido, 3, 30))
      notificacoes.push(new Notificacao("Apelido do Sócio se preenchido precisa ter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalido(this.cliente) && !Validadores.EhValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.TextoComComprimentoEntre(this.idCliente, 36))
      notificacoes.push(new Notificacao("Id do cliente precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalido(this.cliente) && Validadores.EhValorInvalidoOuEspacoEmBranco(this.idCliente))
      notificacoes.push(new Notificacao("Se os dados do cliente não são preenchidos o id do cliente precisa ser fornecido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
      
    if(!Validadores.EhValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.EhValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("Somente um dos dados referente ao cliente deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalido(this.plano) && !Validadores.EhValorInvalidoOuEspacoEmBranco(this.idPlano) && !Validadores.TextoComComprimentoEntre(this.idPlano, 36))
      notificacoes.push(new Notificacao("Id do plano precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalido(this.plano) && Validadores.EhValorInvalidoOuEspacoEmBranco(this.idPlano))
      notificacoes.push(new Notificacao("Se os dados do plano não são preenchidos o id do plano precisa ser fornecido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhValorInvalidoOuEspacoEmBranco(this.idPlano) && !Validadores.EhValorInvalido(this.plano))
      notificacoes.push(new Notificacao("Somente um dos dados referente ao plano deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
      
    if(Validadores.EhValorInvalido(this.endereco))
      notificacoes.push(new Notificacao("O preenchimento do endereço é obrigatório", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.EhValorInvalido(this.cliente))
      this.cliente!.validarModelo(notificacoes, ticketRequisicao);

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.idPlano) && !Validadores.EhValorInvalido(this.plano))
      this.plano!.validarModelo(notificacoes, ticketRequisicao);

    if(!Validadores.EhValorInvalido(this.endereco))
      this.endereco!.validarModelo(notificacoes, ticketRequisicao);
    
    return notificacoes;
  }
}

class AtualizarSocioInput {
  
  apelido?: string | null = null;
  diaVencimentoPagamento: number;
  contato: string;

  nomePlano: string;
  
  cliente: AtualizarClienteInput;
  endereco: AtualizarEnderecoInput;

  constructor(diaVencimentoPagamento: number, contato: string, nomePlano: string, 
    endereco: AtualizarEnderecoInput, cliente: AtualizarClienteInput, apelido?: string | null)
  {
    this.apelido = apelido;
    this.diaVencimentoPagamento = diaVencimentoPagamento;
    this.contato = contato;

    this.nomePlano = nomePlano;

    this.cliente = cliente;
    this.endereco = endereco;
  }

  static construirDoRequest = (socio: any) => {   
    if(Validadores.EhValorInvalido(socio))
      return null;
    
    const { apelido, diaVencimentoPagamento, contato, nomePlano, cliente, endereco } = socio;

    const novoCliente = AtualizarClienteInput.construirDoRequest(cliente);
    const novoEndereco = AtualizarEnderecoInput.construirDoRequest(endereco);

    return new AtualizarSocioInput(diaVencimentoPagamento, contato, nomePlano, novoEndereco!, novoCliente!, apelido);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.EhValorInvalido(this.diaVencimentoPagamento))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(!Validadores.EhNumeroMaiorQue(this.diaVencimentoPagamento, 0))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser maior que 0", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhNumeroMenorQue(this.diaVencimentoPagamento, 28))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser menor que 28", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.diaVencimentoPagamento, 'number'))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser um número", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.contato))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.contato, 11, 15))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ter entre 11 a 15 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.contato, 'string'))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(!Validadores.EhValorInvalidoOuEspacoEmBranco(this.apelido) && !Validadores.TextoComComprimentoEntre(this.apelido, 3, 30))
      notificacoes.push(new Notificacao("Apelido do Sócio se preenchido precisa ter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
  
    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.nomePlano))
      notificacoes.push(new Notificacao("Nome do plano precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.nomePlano, 5, 40))
      notificacoes.push(new Notificacao("Nome do plano precisa ter entre 5 a 40 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.nomePlano, 'string'))
      notificacoes.push(new Notificacao("Nome do plano precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalido(this.endereco))
      notificacoes.push(new Notificacao("O preenchimento do endereço é obrigatório", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("O preenchimento do cliente é obrigatório", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
      
    if(!Validadores.EhValorInvalido(this.endereco))
      this.endereco!.validarModelo(notificacoes, ticketRequisicao);

    if(!Validadores.EhValorInvalido(this.cliente))
      this.cliente!.validarModelo(notificacoes, ticketRequisicao);
    
    return notificacoes;
  }
}

export { AdicionarSocioInput, AtualizarSocioInput }
