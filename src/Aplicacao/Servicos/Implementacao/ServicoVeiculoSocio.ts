import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioSocio } from "../../../Dados/Interfaces/IRepositorioSocio";
import { IRepositorioVeiculoSocio } from "../../../Dados/Interfaces/IRepositorioVeiculoSocio";
import { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput } from "../../Modelos/Inputs/VeiculoSocioInput";
import { ObterClienteResult } from "../../Modelos/Results/ClienteResult";
import { ObterTodosDependentesResult } from "../../Modelos/Results/DependenteResult";
import { ObterEnderecoResult } from "../../Modelos/Results/EnderecoResult";
import { ObterPlanoResult } from "../../Modelos/Results/PlanoResult";
import { AdicionarVeiculoSocioResult, AtualizarVeiculoSocioResult, ObterTodosVeiculosSocioResult, ObterVeiculoSocioResult, VeiculoSocioStatusResult } from "../../Modelos/Results/VeiculoSocioResult";
import { IServicoVeiculoSocio } from "../Interfaces/IServicoVeiculoSocio";

@injectable()
class ServicoVeiculoSocio implements IServicoVeiculoSocio {
  
  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;
  private readonly _repositorioSocio: IRepositorioSocio;
  private readonly _repositorioVeiculoSocio: IRepositorioVeiculoSocio;

  constructor(    
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
    @inject("RepositorioSocio") repositorioSocio: IRepositorioSocio,
    @inject("RepositorioVeiculoSocio") repositorioVeiculoSocio: IRepositorioVeiculoSocio,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
    this._repositorioSocio = repositorioSocio;
    this._repositorioVeiculoSocio = repositorioVeiculoSocio;
  }

  adicionarVeiculo = async (input: AdicionarVeiculoSocioInput, ticketRequisicao: string, idSocio: string) : Promise<AdicionarVeiculoSocioResult | null> => {
    const socioEncontrado = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socioEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    const veiculoEncontrado = await this._repositorioVeiculoSocio.obterVeiculoSocioPelaPlaca(input.placa);

    if(!Validadores.ehValorInvalido(veiculoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Placa já foi cadastrada", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let respostaAdicao: AdicionarVeiculoSocioResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const veiculoAdicionado = await this._repositorioVeiculoSocio.adicionarVeiculoSocio(tx, input.placa, idSocio);

      respostaAdicao = new AdicionarVeiculoSocioResult(veiculoAdicionado!.Id, veiculoAdicionado!.Placa, socioEncontrado!.Id)
    });

    return respostaAdicao;
  }

  atualizarVeiculo = async (input: AtualizarVeiculoSocioInput, ticketRequisicao: string, idSocio: string, idVeiculo: string) : Promise<AtualizarVeiculoSocioResult | null> => {
    const socioEncontrado = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socioEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    const veiculoEncontrado = await this._repositorioVeiculoSocio.obterVeiculoSocioPorId(idVeiculo);

    if(Validadores.ehValorInvalido(veiculoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Veículo não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }
    
    const veiculoVerificado = await this._repositorioVeiculoSocio.obterVeiculoSocioPelaPlaca(input.placa);

    if(!Validadores.ehValorInvalido(veiculoVerificado)){
      this._notificador.adicionarNotificacao(new Notificacao("Placa já foi cadastrada", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    if(!Validadores.ehIgual(socioEncontrado!.Id, veiculoEncontrado!.FkSocio)){
      this._notificador.adicionarNotificacao(new Notificacao("Veículo não está associado ao sócio", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        
      return null;
    }

    let respostaAdicao: AdicionarVeiculoSocioResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const veiculoAtualizado = await this._repositorioVeiculoSocio.atualizarVeiculoSocio(tx, input.placa, idVeiculo)

      respostaAdicao = new AdicionarVeiculoSocioResult(veiculoAtualizado!.Id, veiculoAtualizado!.Placa, socioEncontrado!.Id)
    });

    return respostaAdicao;
  }

  alterarStatusAtivo = async (ticketRequisicao: string, idVeiculo: string, estaAtivo: boolean, idSocio: string): Promise<VeiculoSocioStatusResult | null> => {
    const socio = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }
    
    const veiculoEncontrado = await this._repositorioVeiculoSocio.obterVeiculoSocioPorId(idVeiculo)

    if(Validadores.ehValorInvalido(veiculoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Veículo não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }
    
    if(Validadores.ehIgual(veiculoEncontrado!.Ativo, estaAtivo)){
      this._notificador.adicionarNotificacao(new Notificacao(`Veículo já está ${this.obterStatus(estaAtivo)}`, TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    if(!Validadores.ehIgual(socio!.Id, veiculoEncontrado!.FkSocio)){
      this._notificador.adicionarNotificacao(new Notificacao("Veículo não está associado ao sócio", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        
      return null;
    }

    let resposta: VeiculoSocioStatusResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const veiculoAtualizado = await this._repositorioVeiculoSocio.atualizarStatusAtivoVeiculoSocio(tx, estaAtivo, idVeiculo);
    
      resposta = new VeiculoSocioStatusResult(idVeiculo, veiculoAtualizado.Ativo);
    });
        
    return resposta;
  };

  obterVeiculoPorId = async(ticketRequisicao: string, idVeiculo: string, idSocio: string) : Promise<ObterVeiculoSocioResult | null> => {
    const socio = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }
    
    const veiculoEncontrado = await this._repositorioVeiculoSocio.obterVeiculoSocioPorId(idVeiculo);

    if(Validadores.ehValorInvalido(veiculoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao(`Veículo não foi encontrado`, TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    if(!Validadores.ehIgual(socio!.Id, veiculoEncontrado!.FkSocio)){
      this._notificador.adicionarNotificacao(new Notificacao("Veículo não está associado ao sócio", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        
      return null;
    }

    const resposta = new ObterVeiculoSocioResult(veiculoEncontrado!.Id, veiculoEncontrado!.Placa, veiculoEncontrado!.Ativo,
      veiculoEncontrado!.FkSocio, veiculoEncontrado!.DataCriacao, veiculoEncontrado!.DataAtualizacao
    );

    return resposta;
  }

  obterVeiculosDoSocio = async(ticketRequisicao: string, idSocio: string) : Promise<ObterVeiculoSocioResult[] | null> => {
    const socio = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }
    
    const veiculosEncontrados = await this._repositorioVeiculoSocio.obterVeiculosPeloIdSocio(idSocio);

    if(veiculosEncontrados.length === 0)
      return null;

    const resposta = veiculosEncontrados.map(p => new ObterVeiculoSocioResult(p!.Id, p!.Placa, p!.Ativo,
      p!.FkSocio, p!.DataCriacao, p!.DataAtualizacao
    ));

    return resposta;
  }

  private obterStatus = (status: boolean) => status ? 'habilitado' : 'desabilitado';

}

export { ServicoVeiculoSocio }