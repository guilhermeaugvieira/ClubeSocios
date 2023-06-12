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

  obterPapeis = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const resposta = await this._servicoPapel.obterTodosOsPapeis();

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterPapelPorId = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idPapel = req.params.idPapel;

    if(!Validadores.textoComComprimentoEntre(idPapel, 36)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do papel inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoPapel.obterPapelPorId(idPapel, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorPapel }