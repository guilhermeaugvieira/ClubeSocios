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

  obterPlanos = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const resposta = await this._servicoPlano.obterTodosOsPlanos();

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterPlanoPorId = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idPlano = req.params.idPlano;

    if(!Validadores.textoComComprimentoEntre(idPlano, 36)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do plano inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoPlano.obterPlanoPorId(idPlano, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorPlano }