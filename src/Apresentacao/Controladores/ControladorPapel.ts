import { StatusCodes } from "http-status-codes";
import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response } from 'express';
import { IServicoPapel } from "../../Aplicacao/Servicos/Interfaces/IServicoPapel";
import { Validadores } from "../../Core/Validadores";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";
import { AdicionarPapelInput, AtualizarPapelInput } from "../../Aplicacao/Modelos/Inputs/PapelInput";

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

  adicionarPapel = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();
    
    const input = AdicionarPapelInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));
      
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoPapel.adicionarPapel(input!, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.CREATED, resposta, ticketRequisicao);
  }

  atualizarPapel = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idPapel = req.params.idPapel;
    
    if(!Validadores.textoComComprimentoEntre(idPapel, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do papel inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));
    
    const input = AtualizarPapelInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0)
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoPapel.atualizarPapel(idPapel, input!, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  atualizarStatusAtivoPapel = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idPapel = req.params.idPapel;
    const status = req.body.status as boolean;
    
    if(!Validadores.textoComComprimentoEntre(idPapel, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do papel inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(status, 'boolean'))
      this._notificador.adicionarNotificacao(new Notificacao("Status inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoPapel.atualizarStatusPapel(idPapel, status, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorPapel }