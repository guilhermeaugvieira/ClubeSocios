import { INotificador } from "./INotificador";
import { Notificacao } from "./Notificacao";

class Notificador implements INotificador{

  private _MensagensErro: Notificacao[];

  constructor(){
    this._MensagensErro = new Array<Notificacao>();
  }

  adicionarNotificacao = (erro: Notificacao) : void => {
    if(erro.Mensagem.trim().length === 0)
      return;
    
    this._MensagensErro.push(erro);
  }

  obterNotificacoes = (ticketRequisicao: string) : Notificacao[] =>  {
    return this._MensagensErro.filter(mensagem => mensagem.TicketRequisicao === ticketRequisicao);
  }

  temNotificacao = (ticketRequisicao: string) : Boolean => {
    return this._MensagensErro.some(mensagem => mensagem.TicketRequisicao === ticketRequisicao);
  }

  limparNotificacoesRequisicao = (ticketRequisicao: string) :void => {
    this._MensagensErro = this._MensagensErro.filter(mensagem => mensagem.TicketRequisicao !== ticketRequisicao);
  }
}

export { Notificador }