import { AdicionarPapelInput } from "../../Modelos/Inputs/PapelInput";
import { AdicionarPapelResult, AtualizarPapelResult, ObterPapelResult, PapelStatusResult } from "../../Modelos/Results/PapelResult"

interface IServicoPapel {
  obterTodosOsPapeis() :Promise<ObterPapelResult[]>;
  obterPapelPorId(idPapel: string, ticketRequisicao: string) :Promise<ObterPapelResult | null>;
  adicionarPapel(papel: AdicionarPapelInput, ticketRequisicao: string): Promise<AdicionarPapelResult | null>;
  atualizarPapel(idPapel: string, papel: AdicionarPapelInput, ticketRequisicao: string): Promise<AtualizarPapelResult | null>;
  atualizarStatusPapel(idpapel: string, estaAtivo: boolean, ticketRequisicao: string): Promise<PapelStatusResult | null>;
}

export { IServicoPapel }