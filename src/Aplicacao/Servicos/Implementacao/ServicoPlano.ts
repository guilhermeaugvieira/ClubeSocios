import { Plano, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioPlano } from "../../../Dados/Interfaces/IRepositorioPlano";
import { AdicionarPlanoInput } from "../../Modelos/Inputs/PlanoInput";
import { ObterPlanoResult } from "../../Modelos/Results/PlanoResult";
import { IServicoPlano } from "../Interfaces/IServicoPlano";

@injectable()
class ServicoPlano implements IServicoPlano {

  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;
  private readonly _repositorioPlano: IRepositorioPlano;

  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
    @inject("RepositorioPlano") repositorioPapel: IRepositorioPlano,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
    this._repositorioPlano = repositorioPapel;
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

  // adicionarPlano = async(plano: AdicionarPlanoInput, ticketRequisicao: string): Promise<ObterPlanoResult> => {
  //   const planoEncontrado = await this._repositorioPlano.obterPlanoPorNome(plano.nome)
  // }

}

export { ServicoPlano }