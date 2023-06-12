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

  adicionarColaborador = async (req: Request, res: Response) : Promise<Response> => {   
    
    const ticketRequisicao = this.criarTicketRequisicao();

    const input = AdicionarColaboradorInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));
      
      return this.respostaBase(res, StatusCodes.CREATED, null, ticketRequisicao);
    }

    const resposta = await this._servicoColaborador.adicionarColaborador(input!, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.CREATED, resposta, ticketRequisicao);
  };

  loginColaborador = async (req: Request, res: Response) : Promise<Response> => {
    
    const ticketRequisicao = this.criarTicketRequisicao();

    const input = LoginColaboradorInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));
      
      return this.respostaBase(res, StatusCodes.CREATED, null, ticketRequisicao);
    }

    const resposta = await this._servicoColaborador.loginColaborador(input!, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

}

export { ControladorColaborador }