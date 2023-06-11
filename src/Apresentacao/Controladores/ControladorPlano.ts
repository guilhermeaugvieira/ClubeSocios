import { StatusCodes } from "http-status-codes";
import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { IServicoPlano } from "../../Aplicacao/Servicos/Interfaces/IServicoPlano";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response } from 'express';
import { Validadores } from "../../Core/Validadores";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";

@scoped(Lifecycle.ResolutionScoped)
@injectable()
class ControladorPlano extends ControladorBase{

  private readonly _servicoPlano: IServicoPlano;

  constructor(
    @inject("Notificador") notificador : INotificador,
    @inject("ServicoPlano") servicoPlano: IServicoPlano,
  ){
    super(notificador);
    this._servicoPlano = servicoPlano;
  }

  ObterPlanos = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const resposta = await this._servicoPlano.ObterTodosOsPlanos();

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  ObterPlanoPorId = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const idPlano = req.params.idPlano;

    if(!Validadores.TextoComComprimentoEntre(idPlano, 36)){
      this._notificador.AdicionarNotificacao(new Notificacao("Id do plano inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.RespostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoPlano.ObterPlanoPorId(idPlano, ticketRequisicao);

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorPlano }