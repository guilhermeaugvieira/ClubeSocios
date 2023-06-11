import { Plano, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioPlano } from "../../../Dados/Interfaces/IRepositorioPlano";
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

  ObterTodosOsPlanos = async () :Promise<ObterPlanoResult[] | null> => {
    const planosEncontrados = await this._repositorioPlano.ObterTodosOsPlanos();

    if(Validadores.EhIgual(planosEncontrados.length, 0)){
      return null;
    }

    const listaPapeis = new Array<ObterPlanoResult>();
    
    planosEncontrados.forEach(plano => {
      listaPapeis.push(this.ConverterEntidadeEmDto(plano));
    });

    return listaPapeis;
  }

  ObterPlanoPorId = async(idPlano: string, ticketRequisicao: string) :Promise<ObterPlanoResult | null> => {
    const papelEncontrado = await this._repositorioPlano.ObterPlanoPorId(idPlano);

    if(Validadores.EhValorInvalido(papelEncontrado)){
      this._notificador.AdicionarNotificacao(new Notificacao("Plano não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    return this.ConverterEntidadeEmDto(papelEncontrado!);
  }

  private ConverterEntidadeEmDto = (plano: Plano): ObterPlanoResult => {
    return new ObterPlanoResult(plano.Id, plano.Nome, plano.Descricao, plano.TipoRecorrencia, 
      parseFloat(plano.ValorMensalidade.toString()), plano.Modalidade, plano.Ativo, plano.DataCriacao, plano.DataAtualizacao);
  }

}

export { ServicoPlano }