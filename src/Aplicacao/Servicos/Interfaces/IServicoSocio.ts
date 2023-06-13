import { AdicionarSocioInput, AtualizarSocioInput } from "../../Modelos/Inputs/SocioInput";
import { AdicionarSocioResult, AtualizarSocioResult, ObterSocioResult, SocioStatusResult } from "../../Modelos/Results/SocioResult";

interface IServicoSocio{
  adicionarSocio(input: AdicionarSocioInput, ticketRequisicao: string): Promise<AdicionarSocioResult | null>;
  atualizarSocio(input: AtualizarSocioInput, ticketRequisicao: string, idSocio: string): Promise<AtualizarSocioResult | null>;
  alterarStatusAtivo(ticketRequisicao: string, idSocio: string, estaAtivo: boolean): Promise<SocioStatusResult | null>;
  obterTodosOsSocios() :Promise<ObterSocioResult[] | null>;
  obterSocioPorId(idSocio: string, ticketRequisicao: string) : Promise<ObterSocioResult | null>;
}

export { IServicoSocio };
