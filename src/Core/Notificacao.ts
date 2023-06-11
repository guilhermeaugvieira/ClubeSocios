enum TipoNotificacao{
  RecursoNaoEncontrado,
  RegraDeNegocio,
  DadoIncorreto,
};

class Notificacao {
  
  Mensagem : string;
  TipoErro : TipoNotificacao;
  Modulo: string;
  TicketRequisicao: string;

  constructor(conteudo: string, tipoErro: TipoNotificacao, modulo: any, ticketRequisicao: string){
    this.Mensagem = conteudo;
    this.TipoErro = tipoErro;
    this.Modulo = modulo.constructor.name;
    this.TicketRequisicao = ticketRequisicao;
  }

}

export { Notificacao, TipoNotificacao }