import { ObterPapelResult } from "../../Modelos/Results/PapelResult"

interface IServicoPapel {
  ObterTodosOsPapeis() :Promise<ObterPapelResult[]>;
  ObterPapelPorId(idPapel: string, ticketRequisicao: string) :Promise<ObterPapelResult | null>;
}

export { IServicoPapel }