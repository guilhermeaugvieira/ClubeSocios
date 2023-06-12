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

  adicionarSocio = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const input = AdicionarSocioInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));
      
      return this.respostaBase(res, StatusCodes.CREATED, null, ticketRequisicao);
    }

    const resposta = await this._servicoSocio.adicionarSocio(input!, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.CREATED, resposta, ticketRequisicao);

  }

  atualizarSocio = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const input = AtualizarSocioInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));
      
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoSocio.atualizarSocio(input!, ticketRequisicao, idSocio);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  atualizarStatusSocio = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;
    const status = req.body.status as boolean;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoSocio.alterarStatusAtivo(ticketRequisicao, idSocio, status);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterSocios = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const resposta = await this._servicoSocio.obterTodosOsSocios();

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterSocioPorId = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoSocio.obterSocioPorId(idSocio, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorSocio }
