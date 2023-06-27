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
    if(Validadores.ehValorInvalido(socio))
      return null;
    
    const { apelido, diaVencimentoPagamento, contato, idPlano, idCliente, plano, cliente, endereco } = socio;

    const novoCliente = AdicionarClienteInput.construirDoRequest(cliente);
    const novoPlano = AdicionarPlanoInput.construirDoRequest(plano);
    const novoEndereco = AdicionarEnderecoInput.construirDoRequest(endereco);

    return new AdicionarSocioInput(diaVencimentoPagamento, contato, novoEndereco, apelido, idPlano, idCliente, novoPlano, novoCliente);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.ehValorInvalido(this.diaVencimentoPagamento))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(!Validadores.ehNumeroMaiorQue(this.diaVencimentoPagamento, 0))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser maior que 0", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehNumeroMenorQue(this.diaVencimentoPagamento, 28))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser menor que 28", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.diaVencimentoPagamento, 'number'))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser um número", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.contato))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.contato, 11, 15))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ter entre 11 a 15 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.contato, 'string'))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(!Validadores.ehValorInvalidoOuEspacoEmBranco(this.apelido) && !Validadores.textoComComprimentoEntre(this.apelido, 3, 30))
      notificacoes.push(new Notificacao("Apelido do Sócio se preenchido precisa ter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.cliente) && !Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.textoComComprimentoEntre(this.idCliente, 36))
      notificacoes.push(new Notificacao("Id do cliente precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.cliente) && !Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.ehVariavelDoTipo(this.idCliente, 'string'))
      notificacoes.push(new Notificacao("Id do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.cliente) && Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente))
      notificacoes.push(new Notificacao("Se os dados do cliente não são preenchidos o id do cliente precisa ser fornecido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
      
    if(!Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.ehValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("Somente um dos dados referente ao cliente deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.plano) && !Validadores.ehValorInvalidoOuEspacoEmBranco(this.idPlano) && !Validadores.textoComComprimentoEntre(this.idPlano, 36))
      notificacoes.push(new Notificacao("Id do plano precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.plano) && Validadores.ehValorInvalidoOuEspacoEmBranco(this.idPlano))
      notificacoes.push(new Notificacao("Se os dados do plano não são preenchidos o id do plano precisa ser fornecido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehValorInvalidoOuEspacoEmBranco(this.idPlano) && !Validadores.ehValorInvalido(this.plano))
      notificacoes.push(new Notificacao("Somente um dos dados referente ao plano deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
      
    if(Validadores.ehValorInvalido(this.endereco))
      notificacoes.push(new Notificacao("O preenchimento do endereço é obrigatório", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.ehValorInvalido(this.cliente))
      this.cliente!.validarModelo(notificacoes, ticketRequisicao);

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.idPlano) && !Validadores.ehValorInvalido(this.plano))
      this.plano!.validarModelo(notificacoes, ticketRequisicao);

    if(!Validadores.ehValorInvalido(this.endereco))
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
    if(Validadores.ehValorInvalido(socio))
      return null;
    
    const { apelido, diaVencimentoPagamento, contato, nomePlano, cliente, endereco } = socio;

    const clienteAtualizado = AtualizarClienteInput.construirDoRequest(cliente);
    const enderecoAtualizado = AtualizarEnderecoInput.construirDoRequest(endereco);

    return new AtualizarSocioInput(diaVencimentoPagamento, contato, nomePlano, enderecoAtualizado!, clienteAtualizado!, apelido);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.ehValorInvalido(this.diaVencimentoPagamento))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(!Validadores.ehNumeroMaiorQue(this.diaVencimentoPagamento, 0))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser maior que 0", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehNumeroMenorQue(this.diaVencimentoPagamento, 28))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser menor que 28", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.diaVencimentoPagamento, 'number'))
      notificacoes.push(new Notificacao("Dia de Vencimento do Pagamento do Sócio precisa ser um número", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.contato))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.contato, 11, 15))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ter entre 11 a 15 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.contato, 'string'))
      notificacoes.push(new Notificacao("Contato do Sócio precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(!Validadores.ehValorInvalidoOuEspacoEmBranco(this.apelido) && !Validadores.textoComComprimentoEntre(this.apelido, 3, 30))
      notificacoes.push(new Notificacao("Apelido do Sócio se preenchido precisa ter entre 3 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
  
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.nomePlano))
      notificacoes.push(new Notificacao("Nome do plano precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(this.nomePlano, 5, 40))
      notificacoes.push(new Notificacao("Nome do plano precisa ter entre 5 a 40 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(this.nomePlano, 'string'))
      notificacoes.push(new Notificacao("Nome do plano precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.endereco))
      notificacoes.push(new Notificacao("O preenchimento do endereço é obrigatório", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("O preenchimento do cliente é obrigatório", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
      
    if(!Validadores.ehValorInvalido(this.endereco))
      this.endereco!.validarModelo(notificacoes, ticketRequisicao);

    if(!Validadores.ehValorInvalido(this.cliente))
      this.cliente!.validarModelo(notificacoes, ticketRequisicao);
    
    return notificacoes;
  }
}

export { AdicionarSocioInput, AtualizarSocioInput }
