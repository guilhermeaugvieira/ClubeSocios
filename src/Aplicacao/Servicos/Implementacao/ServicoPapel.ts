import { Papel, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioPapel } from "../../../Dados/Interfaces/IRepositorioPapel";
import { AdicionarPapelInput } from "../../Modelos/Inputs/PapelInput";
import { AdicionarPapelResult, AtualizarPapelResult, ObterPapelResult, PapelStatusResult } from "../../Modelos/Results/PapelResult";
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

  adicionarPapel = async(papel: AdicionarPapelInput, ticketRequisicao: string): Promise<AdicionarPapelResult | null> => {
    const papelEncontrado = await this._repositorioPapel.obterPapelPorNome(papel.nome);

    if(!Validadores.ehValorInvalido(papelEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Papel já existe", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let papelAdicionado: Papel | null = null;

    await this._databaseManager.$transaction(async (tx) => {
      papelAdicionado = await this._repositorioPapel.adicionarPapel(tx, papel.nome);
    })

    return new AdicionarPapelResult(papelAdicionado!.Nome, papelAdicionado!.Id);
  }

  atualizarPapel = async(idPapel: string, papel: AdicionarPapelInput, ticketRequisicao: string): Promise<AtualizarPapelResult | null> => {
    let papelEncontrado = await this._repositorioPapel.obterPapelPorId(idPapel);

    if(Validadores.ehValorInvalido(papelEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Papel não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    let papelAtualizado: Papel | null = null;

    await this._databaseManager.$transaction(async (tx) => {
      papelAtualizado = await this._repositorioPapel.atualizarDadosPapel(tx, papel.nome, idPapel);
    })

    return new AtualizarPapelResult(papelAtualizado!.Nome, papelAtualizado!.Id);
  }

  atualizarStatusPapel = async(idpapel: string, estaAtivo: boolean, ticketRequisicao: string): Promise<PapelStatusResult | null> => {
    let papelEncontrado = await this._repositorioPapel.obterPapelComColaboradores(idpapel);

    if(Validadores.ehValorInvalido(papelEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Papel não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    if(papelEncontrado!.Ativo === estaAtivo){
      this._notificador.adicionarNotificacao(new Notificacao("Papel já está com o status solicitado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    if(Validadores.ehIgual(estaAtivo, false) && papelEncontrado!.Colaboradores.length > 0){
      this._notificador.adicionarNotificacao(new Notificacao("Para a desativação o papel não pode estar associado a nenhum colaborador", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let papelAtualizado: Papel | null = null;

    await this._databaseManager.$transaction(async (tx) => {
      papelAtualizado = await this._repositorioPapel.atualizarStatusAtivoDopapel(tx, estaAtivo, idpapel);
    })

    return new PapelStatusResult(papelAtualizado!.Id, papelAtualizado!.Ativo);
  }

  private converterEntidadeEmDto = (papel: Papel): ObterPapelResult => {
    return new ObterPapelResult(papel.Id, papel.Nome, papel.Ativo, papel.DataCriacao, papel.DataAtualizacao);
  }

}

export { ServicoPapel }