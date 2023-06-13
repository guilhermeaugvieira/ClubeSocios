import { Plano, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioPlano } from "../../../Dados/Interfaces/IRepositorioPlano";
import { AdicionarPlanoInput, AtualizarPlanoInput } from "../../Modelos/Inputs/PlanoInput";
import { AdicionarPlanoResult, AtualizarPlanoResult, ObterPlanoResult, PlanoStatusResult } from "../../Modelos/Results/PlanoResult";
import { IServicoPlano } from "../Interfaces/IServicoPlano";

@injectable()
class ServicoPlano implements IServicoPlano {

  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;
  private readonly _repositorioPlano: IRepositorioPlano;

  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
    @inject("RepositorioPlano") repositorioPlano: IRepositorioPlano,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
    this._repositorioPlano = repositorioPlano;
  }

  obterTodosOsPlanos = async () :Promise<ObterPlanoResult[] | null> => {
    const planosEncontrados = await this._repositorioPlano.obterTodosOsPlanos();

    if(Validadores.ehIgual(planosEncontrados.length, 0)){
      return null;
    }

    const listaPapeis = new Array<ObterPlanoResult>();
    
    planosEncontrados.forEach(plano => {
      listaPapeis.push(this.converterEntidadeEmDto(plano));
    });

    return listaPapeis;
  }

  obterPlanoPorId = async(idPlano: string, ticketRequisicao: string) :Promise<ObterPlanoResult | null> => {
    const planoEncontrado = await this._repositorioPlano.obterPlanoPorId(idPlano);

    if(Validadores.ehValorInvalido(planoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Plano não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    return this.converterEntidadeEmDto(planoEncontrado!);
  }

  private converterEntidadeEmDto = (plano: Plano): ObterPlanoResult => {
    return new ObterPlanoResult(plano.Id, plano.Nome, plano.Descricao, plano.TipoRecorrencia, 
      parseFloat(plano.ValorMensalidade.toString()), plano.Modalidade, plano.Ativo, plano.DataCriacao, plano.DataAtualizacao);
  }

  adicionarPlano = async(plano: AdicionarPlanoInput, ticketRequisicao: string): Promise<AdicionarPlanoResult | null> => {
    const planoEncontrado = await this._repositorioPlano.obterPlanoPorNome(plano.nome);

    if(!Validadores.ehValorInvalido(planoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Plano já existe", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let planoAdicionado: Plano | null = null;

    await this._databaseManager.$transaction(async (tx) => {
      planoAdicionado = await this._repositorioPlano.adicionarPlano(tx, plano.nome, plano.descricao, plano.tipoRecorrencia, plano.valorMensalidade, plano.modalidade);
    })

    return new AdicionarPlanoResult(planoAdicionado!.Nome, planoAdicionado!.Descricao, planoAdicionado!.TipoRecorrencia, planoAdicionado!.Modalidade, planoAdicionado!.ValorMensalidade.toNumber(), planoAdicionado!.Id);
  }

  atualizarPlano = async(idPlano: string, plano: AtualizarPlanoInput, ticketRequisicao: string): Promise<AtualizarPlanoResult | null> => {
    let planoEncontrado = await this._repositorioPlano.obterPlanoPorId(idPlano);

    if(Validadores.ehValorInvalido(planoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Plano não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    let planoAtualizado: Plano | null = null;

    const buscaPlano = await this._repositorioPlano.obterPlanoPorNome(plano.nome);

    if(!Validadores.ehValorInvalido(buscaPlano) && !Validadores.ehIgual(buscaPlano!.Id, idPlano)){
      this._notificador.adicionarNotificacao(new Notificacao("Nome já é utilizado por outro plano", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    await this._databaseManager.$transaction(async (tx) => {
      planoAtualizado = await this._repositorioPlano.atualizarDadosPlano(tx, plano.nome, plano.descricao, plano.tipoRecorrencia, plano.valorMensalidade, plano.modalidade, idPlano);
    })

    return new AtualizarPlanoResult(planoAtualizado!.Nome, planoAtualizado!.Descricao, planoAtualizado!.TipoRecorrencia, planoAtualizado!.Modalidade, planoAtualizado!.ValorMensalidade.toNumber(), planoAtualizado!.Id);
  }

  atualizarStatusPlano = async(idPlano: string, estaAtivo: boolean, ticketRequisicao: string): Promise<PlanoStatusResult | null> => {
    let planoEncontrado = await this._repositorioPlano.obterPlanoComSocios(idPlano);

    if(Validadores.ehValorInvalido(planoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Plano não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    if(planoEncontrado!.Ativo === estaAtivo){
      this._notificador.adicionarNotificacao(new Notificacao("Plano já está com o status solicitado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    if(Validadores.ehIgual(estaAtivo, false) && planoEncontrado!.Socios.length > 0){
      this._notificador.adicionarNotificacao(new Notificacao("Para a desativação o plano não pode estar associado a nenhum sócio", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let planoAtualizado: Plano | null = null;

    await this._databaseManager.$transaction(async (tx) => {
      planoAtualizado = await this._repositorioPlano.atualizarStatusAtivoDoPlano(tx, estaAtivo, idPlano);
    })

    return new PlanoStatusResult(idPlano, planoAtualizado!.Ativo);
  }

}

export { ServicoPlano }