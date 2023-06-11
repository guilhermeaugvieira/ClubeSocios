import { Notificacao } from "./Notificacao";

interface INotificador{
  AdicionarNotificacao(erro: Notificacao) : void;
  ObterNotificacoes(ticketRequisicao: string) : Notificacao[];
  TemNotificacao(ticketRequisicao: string) : Boolean;
  LimparNotificacoesRequisicao (ticketRequisicao: string) :void;
}

export { INotificador }