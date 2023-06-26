import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { AdicionarClienteInput, AtualizarClienteInput } from "./ClienteInput";

class AdicionarDependenteInput {
  cliente?: AdicionarClienteInput | null;
  idCliente?: string | null;

  constructor(cliente?: AdicionarClienteInput | null, idCliente?: string | null){
    this.cliente = cliente;
    this.idCliente = idCliente;
  }

  static construirDoRequest = (dependente: any) => {   
    if(Validadores.ehValorInvalido(dependente))
      return null;
    
    const { cliente, idCliente } = dependente;
    
    const novoCliente = AdicionarClienteInput.construirDoRequest(cliente);
    
    return new AdicionarDependenteInput(novoCliente, idCliente);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.ehValorInvalido(this.cliente) && !Validadores.ehVariavelDoTipo(this.idCliente, 'string'))
    notificacoes.push(new Notificacao("Id do cliente precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalido(this.cliente) && !Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.textoComComprimentoEntre(this.idCliente, 36))
    notificacoes.push(new Notificacao("Id do cliente precisa ter 36 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && Validadores.ehValorInvalido(this.cliente))
    notificacoes.push(new Notificacao("Se o id do cliente não é fornecido deve ser preenchido os dados do cliente", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.ehValorInvalido(this.cliente))
    notificacoes.push(new Notificacao("Somente um dos dados referente ao cliente deve ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.ehValorInvalidoOuEspacoEmBranco(this.idCliente) && !Validadores.ehValorInvalido(this.cliente))
      this.cliente!.validarModelo(notificacoes, ticketRequisicao);

    return notificacoes;
  }
}

class AtualizarDependenteInput {
  cliente: AtualizarClienteInput | null;

  constructor(cliente: AtualizarClienteInput | null){
    this.cliente = cliente;
  }

  static construirDoRequest = (dependente: any) => {   
    if(Validadores.ehValorInvalido(dependente))
      return null;
    
    const { cliente } = dependente;
    
    const clienteAtualizado = AtualizarClienteInput.construirDoRequest(cliente);
    
    return new AtualizarDependenteInput(clienteAtualizado);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.ehValorInvalido(this.cliente))
      notificacoes.push(new Notificacao("Deve ser preenchido os dados do cliente", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.ehValorInvalido(this.cliente))
      this.cliente!.validarModelo(notificacoes, ticketRequisicao);

    return notificacoes;
  }
}

export { AdicionarDependenteInput, AtualizarDependenteInput }

