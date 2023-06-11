import { StatusCodes } from "http-status-codes";
import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response } from 'express';
import { IServicoPapel } from "../../Aplicacao/Servicos/Interfaces/IServicoPapel";
import { Validadores } from "../../Core/Validadores";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";

@scoped(Lifecycle.ResolutionScoped)
@injectable()
class ControladorPapel extends ControladorBase{

  private readonly _servicoPapel: IServicoPapel;

  constructor(
    @inject("Notificador") notificador : INotificador,
    @inject("ServicoPapel") servicoPapel: IServicoPapel,
  ){
    super(notificador);
    this._servicoPapel = servicoPapel;
  }

  ObterPapeis = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const resposta = await this._servicoPapel.ObterTodosOsPapeis();

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  ObterPapelPorId = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const idPapel = req.params.idPapel;

    if(!Validadores.TextoComComprimentoEntre(idPapel, 36)){
      this._notificador.AdicionarNotificacao(new Notificacao("Id do papel inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.RespostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoPapel.ObterPapelPorId(idPapel, ticketRequisicao);

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorPapel }