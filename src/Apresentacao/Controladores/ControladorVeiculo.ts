import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { Validadores } from "../../Core/Validadores";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";
import { IServicoVeiculoSocio } from "../../Aplicacao/Servicos/Interfaces/IServicoVeiculoSocio";
import { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput } from "../../Aplicacao/Modelos/Inputs/VeiculoSocioInput";

@scoped(Lifecycle.ResolutionScoped)
@injectable()
class ControladorVeiculo extends ControladorBase {

  private readonly _servicoVeiculoSocio: IServicoVeiculoSocio;

  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("ServicoVeiculoSocio") servicoVeiculoSocio: IServicoVeiculoSocio,
  ){
    super(notificador);
    this._servicoVeiculoSocio = servicoVeiculoSocio;
  }

  adicionarVeiculo = async(req: Request, res: Response) : Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    const input = AdicionarVeiculoSocioInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0){
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));
    }

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoVeiculoSocio.adicionarVeiculo(input!, ticketRequisicao, idSocio);

    return this.respostaBase(res, StatusCodes.CREATED, resposta, ticketRequisicao);
  }

  atualizarVeiculo = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;
    const idVeiculo = req.params.idVeiculo;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(idVeiculo, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do veículo inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    const input = AtualizarVeiculoSocioInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0)
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoVeiculoSocio.atualizarVeiculo(input!, ticketRequisicao, idSocio, idVeiculo);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  atualizarStatusVeiculo = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const status = req.body.status as boolean;
    const idSocio = req.params.idSocio;
    const idVeiculo = req.params.idVeiculo;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(idVeiculo, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do veículo inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(status, 'boolean'))
      this._notificador.adicionarNotificacao(new Notificacao("Status inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoVeiculoSocio.alterarStatusAtivo(ticketRequisicao, idVeiculo, status, idSocio);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterVeiculos = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    const resposta = await this._servicoVeiculoSocio.obterVeiculosDoSocio(ticketRequisicao, idSocio)

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterVeiculoPorId = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;
    const idVeiculo = req.params.idVeiculo;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.textoComComprimentoEntre(idVeiculo, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do veiculo inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoVeiculoSocio.obterVeiculoPorId(ticketRequisicao, idVeiculo, idSocio);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }
}

export { ControladorVeiculo }
