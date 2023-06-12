import { Papel, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioPapel } from "../../../Dados/Interfaces/IRepositorioPapel";
import { ObterPapelResult } from "../../Modelos/Results/PapelResult";
import { IServicoPapel } from "../Interfaces/IServicoPapel";

@injectable()
class ServicoPapel implements IServicoPapel {

  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;
  private readonly _repositorioPapel: IRepositorioPapel;

  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
    @inject("RepositorioPapel") repositorioPapel: IRepositorioPapel,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
    this._repositorioPapel = repositorioPapel;
  }

  obterTodosOsPapeis = async () :Promise<ObterPapelResult[]> => {
    const papeisEncontrados = await this._repositorioPapel.obterTodosOsPapeis();

    const listaPapeis = new Array<ObterPapelResult>();
    
    papeisEncontrados.forEach(papel => {
      listaPapeis.push(this.converterEntidadeEmDto(papel));
    });

    return listaPapeis;
  }

  obterPapelPorId = async(idPapel: string, ticketRequisicao: string) :Promise<ObterPapelResult | null> => {
    const papelEncontrado = await this._repositorioPapel.obterPapelPorId(idPapel);

    if(Validadores.ehValorInvalido(papelEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Papel não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    return this.converterEntidadeEmDto(papelEncontrado!);
  }

  private converterEntidadeEmDto = (papel: Papel): ObterPapelResult => {
    return new ObterPapelResult(papel.Id, papel.Nome, papel.Ativo, papel.DataCriacao, papel.DataAtualizacao);
  }

}

export { ServicoPapel }