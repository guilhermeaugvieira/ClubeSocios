import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { IServicoSocio } from "../../Aplicacao/Servicos/Interfaces/IServicoSocio";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response } from 'express';
import { AdicionarSocioInput, AtualizarSocioInput } from "../../Aplicacao/Modelos/Inputs/SocioInput";
import { StatusCodes } from "http-status-codes";
import { Validadores } from "../../Core/Validadores";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";

@scoped(Lifecycle.ResolutionScoped)
@injectable()
class ControladorSocio extends ControladorBase {

  private readonly _servicoSocio: IServicoSocio;

  constructor(
    @inject("ServicoSocio") servicoSocio: IServicoSocio,
    @inject("Notificador") notificador: INotificador
  ){
    super(notificador);
    this._servicoSocio = servicoSocio;
  }

  AdicionarSocio = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const input = AdicionarSocioInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.AdicionarNotificacao(notificacao));
      
      return this.RespostaBase(res, StatusCodes.CREATED, null, ticketRequisicao);
    }

    const resposta = await this._servicoSocio.AdicionarSocio(input!, ticketRequisicao);

    return this.RespostaBase(res, StatusCodes.CREATED, resposta, ticketRequisicao);

  }

  AtualizarSocio = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const idSocio = req.params.idSocio;

    if(!Validadores.TextoComComprimentoEntre(idSocio, 36)){
      this._notificador.AdicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.RespostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const input = AtualizarSocioInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.AdicionarNotificacao(notificacao));
      
      return this.RespostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoSocio.AtualizarSocio(input!, ticketRequisicao, idSocio);

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  AtualizarStatusSocio = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const idSocio = req.params.idSocio;
    const status = req.body.status as boolean;

    if(!Validadores.TextoComComprimentoEntre(idSocio, 36)){
      this._notificador.AdicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.RespostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoSocio.AlterarStatusAtivo(ticketRequisicao, idSocio, status);

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  ObterSocios = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const resposta = await this._servicoSocio.ObterTodosOsSocios();

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  ObterSocioPorId = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.CriarTicketRequisicao();

    const idSocio = req.params.idSocio;

    if(!Validadores.TextoComComprimentoEntre(idSocio, 36)){
      this._notificador.AdicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.RespostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoSocio.ObterSocioPorId(idSocio, ticketRequisicao);

    return this.RespostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorSocio }
