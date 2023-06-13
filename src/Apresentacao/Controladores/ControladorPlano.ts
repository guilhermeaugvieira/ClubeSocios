import { StatusCodes } from "http-status-codes";
import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { IServicoPlano } from "../../Aplicacao/Servicos/Interfaces/IServicoPlano";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response } from 'express';
import { Validadores } from "../../Core/Validadores";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";
import { AdicionarPlanoInput, AtualizarPlanoInput } from "../../Aplicacao/Modelos/Inputs/PlanoInput";

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

  adicionarPlano = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();
    
    const input = AdicionarPlanoInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));
      
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);
    }

    const resposta = await this._servicoPlano.adicionarPlano(input!, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.CREATED, resposta, ticketRequisicao);
  }

  atualizarPlano = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idPlano = req.params.idPlano;
    
    if(!Validadores.textoComComprimentoEntre(idPlano, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do plano inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));
    
    const input = AtualizarPlanoInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0)
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoPlano.atualizarPlano(idPlano, input!, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  atualizarStatusAtivoPlano = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idPlano = req.params.idPlano;
    const status = req.body.status as boolean;
    
    if(!Validadores.textoComComprimentoEntre(idPlano, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do plano inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(status, 'boolean'))
      this._notificador.adicionarNotificacao(new Notificacao("Status inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoPlano.atualizarStatusPlano(idPlano, status, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorPlano }