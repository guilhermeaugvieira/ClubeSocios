import { INotificador } from "./INotificador";
import { Notificacao } from "./Notificacao";

class Notificador implements INotificador{

  private _MensagensErro: Notificacao[];

  constructor(){
    this._MensagensErro = new Array<Notificacao>();
  }

  AdicionarNotificacao = (erro: Notificacao) : void => {
    if(erro.Mensagem.trim().length === 0)
      return;
    
    this._MensagensErro.push(erro);
  }

  ObterNotificacoes = (ticketRequisicao: string) : Notificacao[] =>  {
    return this._MensagensErro.filter(mensagem => mensagem.TicketRequisicao === ticketRequisicao);
  }

  TemNotificacao = (ticketRequisicao: string) : Boolean => {
    return this._MensagensErro.some(mensagem => mensagem.TicketRequisicao === ticketRequisicao);
  }

  LimparNotificacoesRequisicao = (ticketRequisicao: string) :void => {
    this._MensagensErro = this._MensagensErro.filter(mensagem => mensagem.TicketRequisicao !== ticketRequisicao);
  }
}

export { Notificador }