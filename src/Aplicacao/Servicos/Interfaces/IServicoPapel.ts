import { ObterPapelResult } from "../../Modelos/Results/PapelResult"

interface IServicoPapel {
  obterTodosOsPapeis() :Promise<ObterPapelResult[]>;
  obterPapelPorId(idPapel: string, ticketRequisicao: string) :Promise<ObterPapelResult | null>;
}

export { IServicoPapel }