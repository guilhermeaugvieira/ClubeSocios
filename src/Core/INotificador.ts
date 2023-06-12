import { Notificacao } from "./Notificacao";

interface INotificador{
  adicionarNotificacao(erro: Notificacao) : void;
  obterNotificacoes(ticketRequisicao: string) : Notificacao[];
  temNotificacao(ticketRequisicao: string) : Boolean;
  limparNotificacoesRequisicao (ticketRequisicao: string) :void;
}

export { INotificador }