import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";

class AdicionarPlanoInput {
  
  nome: string;
  descricao: string;
  tipoRecorrencia: string;
  valorMensalidade: number;
  modalidade: string;

  constructor(nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string){
    this.nome = nome;
    this.descricao = descricao;
    this.tipoRecorrencia = tipoRecorrencia;
    this.valorMensalidade = valorMensalidade;
    this.modalidade = modalidade;
  }

  static construirDoRequest = (plano: any) => {   
    if(Validadores.EhValorInvalido(plano))
      return null;
    
    const { nome, descricao, tipoRecorrencia, valorMensalidade, modalidade } = plano;

    return new AdicionarPlanoInput(nome, descricao, tipoRecorrencia, valorMensalidade, modalidade);
  }

  validarModelo = (notificacoes: Notificacao[], ticketRequisicao: string) : Notificacao[] => {
    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.descricao))
      notificacoes.push(new Notificacao("Descrição do plano precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.descricao, 10, 256))
      notificacoes.push(new Notificacao("Descrição do plano precisa ter entre 10 a 256 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.descricao, 'string'))
      notificacoes.push(new Notificacao("Descrição do plano precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.nome))
      notificacoes.push(new Notificacao("Nome do plano precisa ser preenchido", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.nome, 5, 40))
      notificacoes.push(new Notificacao("Nome do plano precisa ter entre 5 a 40 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.nome, 'string'))
      notificacoes.push(new Notificacao("Nome do plano precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.tipoRecorrencia))
      notificacoes.push(new Notificacao("Tipo de Recorrência do plano precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.tipoRecorrencia, 3, 15))
      notificacoes.push(new Notificacao("Tipo de Recorrência do plano precisa ter entre 3 a 15 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.tipoRecorrencia, 'string'))
      notificacoes.push(new Notificacao("Tipo Recorrencia do plano precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(Validadores.EhValorInvalidoOuEspacoEmBranco(this.modalidade))
      notificacoes.push(new Notificacao("Modalidade do plano precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.TextoComComprimentoEntre(this.modalidade, 5, 30))
      notificacoes.push(new Notificacao("Modalidade do plano precisa ter entre 5 a 30 caracteres", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.modalidade, 'string'))
      notificacoes.push(new Notificacao("Modalidade do plano precisa ser um texto", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    if(Validadores.EhValorInvalido(this.valorMensalidade))
      notificacoes.push(new Notificacao("Valor da Mensalidade do plano precisa ser preenchida", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));

    if(!Validadores.EhVariavelDoTipo(this.valorMensalidade, 'number'))
      notificacoes.push(new Notificacao("Valor da Mensalidade do plano precisa ser um número", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
    
    return notificacoes;
  }
}

export { AdicionarPlanoInput }