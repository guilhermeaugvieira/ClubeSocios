import { AdicionarSocioInput, AtualizarSocioInput } from "../../Modelos/Inputs/SocioInput";
import { AdicionarSocioResult, AtualizarSocioResult, ObterSocioResult, SocioStatusResult } from "../../Modelos/Results/SocioResult";

interface IServicoSocio{
  AdicionarSocio(input: AdicionarSocioInput, ticketRequisicao: string): Promise<AdicionarSocioResult | null>;
  AtualizarSocio(input: AtualizarSocioInput, ticketRequisicao: string, idSocio: string): Promise<AtualizarSocioResult | null>;
  AlterarStatusAtivo(ticketRequisicao: string, idSocio: string, estaAtivo: boolean): Promise<SocioStatusResult | null>;
  ObterTodosOsSocios() :Promise<ObterSocioResult[] | null>;
  ObterSocioPorId(idSocio: string, ticketRequisicao: string) : Promise<ObterSocioResult | null>;
}

export { IServicoSocio };
