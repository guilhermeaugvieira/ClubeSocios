import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { INotificador } from '../../Core/INotificador';
import { TipoNotificacao } from '../../Core/Notificacao';
import { v4 as uuid } from 'uuid';

abstract class ControladorBase{

  protected readonly _notificador: INotificador;

  constructor(notificador: INotificador){
    this._notificador = notificador;
  }

  protected RespostaBase = <TData>(res: Response, httpSuccessStatusCode: StatusCodes, content: TData | null, ticketRequisicao: string) : Response  => {    
    if(!this._notificador.TemNotificacao(ticketRequisicao)){ 
      if(!content)
        return res.status(StatusCodes.NO_CONTENT).json(content);
      
      return res.status(httpSuccessStatusCode).json({
        sucesso: true,
        dados: content
      });
    }

    const tiposErros = this._notificador.ObterNotificacoes(ticketRequisicao).map(erro => erro.TipoErro);
    const mensagensErro = this._notificador.ObterNotificacoes(ticketRequisicao).map(erro => erro.Mensagem);

    this._notificador.LimparNotificacoesRequisicao(ticketRequisicao);

    const respostaErro = new RespostaErro(mensagensErro);

    if(tiposErros.some(tipo => tipo === TipoNotificacao.RecursoNaoEncontrado))
      return res.status(StatusCodes.NOT_FOUND).json(respostaErro);

    if(tiposErros.some(tipo => tipo === TipoNotificacao.DadoIncorreto))
      return res.status(StatusCodes.BAD_REQUEST).json(respostaErro);

    return res.status(StatusCodes.CONFLICT).json(respostaErro);
  }

  protected CriarTicketRequisicao = () => uuid();

}

export { ControladorBase }

class RespostaErro{
  erros: string[];

  constructor(erros: string[]){
    this.erros = erros;
  }
}