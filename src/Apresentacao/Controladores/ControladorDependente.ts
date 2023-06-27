import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { Validadores } from "../../Core/Validadores";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";
import { IServicoDependente } from "../../Aplicacao/Servicos/Interfaces/IServicoDependente";
import { AdicionarDependenteInput, AtualizarDependenteInput } from "../../Aplicacao/Modelos/Inputs/DependenteInput";

@scoped(Lifecycle.ResolutionScoped)
@injectable()
class ControladorDependente extends ControladorBase {

  private readonly _servicoDependente: IServicoDependente;

  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("ServicoDependente") ServicoDependente: IServicoDependente,
  ){
    super(notificador);
    this._servicoDependente = ServicoDependente;
  }

  adicionarDependente = async(req: Request, res: Response) : Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    const input = AdicionarDependenteInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));
    }

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoDependente.adicionarDependente(input!, idSocio, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.CREATED, resposta, ticketRequisicao);
  }

  atualizarDependente = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;
    const idDependente = req.params.idDependente;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(idDependente, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do dependente inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    const input = AtualizarDependenteInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0)
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoDependente.atualizarDependente(input!, idSocio, idDependente, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  atualizarStatusDependente = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const status = req.body.status as boolean;
    const idSocio = req.params.idSocio;
    const idDependente = req.params.idDependente;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(idDependente, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do dependente inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(status, 'boolean'))
      this._notificador.adicionarNotificacao(new Notificacao("Status inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoDependente.alterarStatusAtivo(ticketRequisicao, idSocio, idDependente, status);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterDependentes = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    const resposta = await this._servicoDependente.obterDependentesPorSocio(idSocio, ticketRequisicao)

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterDependentePorId = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;
    const idDependente = req.params.idDependente;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(idDependente, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do veiculo inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoDependente.obterDependentePorId(idDependente, idSocio, ticketRequisicao);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorDependente }
