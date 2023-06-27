import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { IServicoSocio } from "../../Aplicacao/Servicos/Interfaces/IServicoSocio";
import { INotificador } from "../../Core/INotificador";
import { ControladorBase } from "./ControladorBase";
import { Request, Response } from 'express';
import { AdicionarSocioInput, AtualizarSocioInput } from "../../Aplicacao/Modelos/Inputs/SocioInput";
import { StatusCodes } from "http-status-codes";
import { Validadores } from "../../Core/Validadores";
import { Notificacao, TipoNotificacao } from "../../Core/Notificacao";
import { IServicoVeiculoSocio } from "../../Aplicacao/Servicos/Interfaces/IServicoVeiculoSocio";
import { IServicoDependente } from "../../Aplicacao/Servicos/Interfaces/IServicoDependente";
import { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput } from "../../Aplicacao/Modelos/Inputs/VeiculoSocioInput";
import { AdicionarDependenteInput, AtualizarDependenteInput } from "../../Aplicacao/Modelos/Inputs/DependenteInput";

@scoped(Lifecycle.ResolutionScoped)
@injectable()
class ControladorSocio extends ControladorBase {

  private readonly _servicoSocio: IServicoSocio;
  private readonly _servicoVeiculoSocio: IServicoVeiculoSocio;
  private readonly _servicoDependente: IServicoDependente;

  constructor(
    @inject("ServicoSocio") servicoSocio: IServicoSocio,
    @inject("Notificador") notificador: INotificador,
    @inject("ServicoVeiculoSocio") servicoVeiculoSocio: IServicoVeiculoSocio,
    @inject("ServicoDependente") ServicoDependente: IServicoDependente,
  ){
    super(notificador);
    this._servicoSocio = servicoSocio;
    this._servicoVeiculoSocio = servicoVeiculoSocio;
    this._servicoDependente = ServicoDependente;
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

  atualizarSocio = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    const input = AtualizarSocioInput.construirDoRequest(req.body);

    const errosValidacao = input!.validarModelo([], ticketRequisicao);

    if(errosValidacao.length > 0)
      errosValidacao.forEach(notificacao => this._notificador.adicionarNotificacao(notificacao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoSocio.atualizarSocio(input!, ticketRequisicao, idSocio);

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
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

  atualizarStatusSocio = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;
    const status = req.body.status as boolean;

    if(!Validadores.textoComComprimentoEntre(idSocio, 36))
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(!Validadores.ehVariavelDoTipo(status, 'boolean'))
      this._notificador.adicionarNotificacao(new Notificacao("Status inválido", TipoNotificacao.DadoIncorreto, this,  ticketRequisicao));

    if(this._notificador.temNotificacao(ticketRequisicao))
      return this.respostaBase(res, StatusCodes.OK, null, ticketRequisicao);

    const resposta = await this._servicoSocio.alterarStatusAtivo(ticketRequisicao, idSocio, status);

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

  obterSocios = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const resposta = await this._servicoSocio.obterTodosOsSocios();

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterVeiculos = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    const resposta = await this._servicoVeiculoSocio.obterVeiculosDoSocio(ticketRequisicao, idSocio)

    return this.respostaBase(res, StatusCodes.OK, resposta, ticketRequisicao);
  }

  obterDependentes = async(req: Request, res: Response): Promise<Response> => {
    const ticketRequisicao = this.criarTicketRequisicao();

    const idSocio = req.params.idSocio;

    const resposta = await this._servicoDependente.obterDependentesPorSocio(idSocio, ticketRequisicao)

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

export { ControladorSocio }
