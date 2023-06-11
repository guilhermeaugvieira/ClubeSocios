import { Lifecycle, injectable, scoped, inject } from "tsyringe";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { IServicoColaborador } from "../../Aplicacao/Servicos/Interfaces/IServicoColaborador";
import { AdicionarColaboradorInput, LoginColaboradorInput } from "../../Aplicacao/Modelos/Inputs/ColaboradorInput";

@scoped(Lifecycle.ResolutionScoped)
@injectable()
class ControladorColaborador extends ControladorBase{

  private readonly _servicoColaborador: IServicoColaborador;

  constructor(
    @inject("Notificador") notificador : INotificador,
    @inject("ServicoColaborador") servicoColaborador: IServicoColaborador
  ){
    super(notificador);
    this._servicoColaborador = servicoColaborador;
  }

  AdicionarColaborador = async (req: Request, res: Response) : Promise<Response> => {   
    
    const ticketRequisicao = this.CriarTicketRequisicao();

    const input = AdicionarColaboradorInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.AdicionarNotificacao(notificacao));
      
      return this.RespostaBase(res, StatusCodes.CREATED, null, ticketRequisicao);
    }

    const resposta = await this._servicoColaborador.AdicionarColaborador(input!, ticketRequisicao);

    return this.RespostaBase(res, StatusCodes.CREATED, resposta, ticketRequisicao);
  };

  LoginColaborador = async (req: Request, res: Response) : Promise<Response> => {
    
    const ticketRequisicao = this.CriarTicketRequisicao();

    const input = LoginColaboradorInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.AdicionarNotificacao(notificacao));
      
      return this.RespostaBase(res, StatusCodes.CREATED, null, ticketRequisicao);
    }

    const resposta = await this._servicoColaborador.LoginColaborador(input!, ticketRequisicao);

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

}

export { ControladorColaborador }