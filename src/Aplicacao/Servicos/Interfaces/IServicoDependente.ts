import { AdicionarDependenteInput, AtualizarDependenteInput } from "../../Modelos/Inputs/DependenteInput"
import { AdicionarDependenteResult, AtualizarDependenteResult, DependenteStatusResult, ObterDependenteResult } from "../../Modelos/Results/DependenteResult"

interface IServicoDependente{
  adicionarDependente(input: AdicionarDependenteInput, idSocio: string, ticketRequisicao: string) : Promise<AdicionarDependenteResult | null>;
  atualizarDependente(input: AtualizarDependenteInput, idSocio: string, idDependente: string, ticketRequisicao: string) : Promise<AtualizarDependenteResult | null>;
  alterarStatusAtivo(ticketRequisicao: string, idSocio: string, idDependente: string, estaAtivo: boolean): Promise<DependenteStatusResult | null>;
  obterDependentePorId(idDependente: string, idSocio: string, ticketRequisicao: string) : Promise<ObterDependenteResult | null>;
}

export { IServicoDependente }