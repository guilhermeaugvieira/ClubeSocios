import { AdicionarPlanoInput } from "../../Modelos/Inputs/PlanoInput";
import { AdicionarPlanoResult, AtualizarPlanoResult, ObterPlanoResult, PlanoStatusResult } from "../../Modelos/Results/PlanoResult"

interface IServicoPlano {
  obterTodosOsPlanos() :Promise<ObterPlanoResult[] | null>;
  obterPlanoPorId(idPlano: string, ticketRequisicao: string) :Promise<ObterPlanoResult | null>;
  adicionarPlano(plano: AdicionarPlanoInput, ticketRequisicao: string): Promise<AdicionarPlanoResult | null>;
  atualizarPlano(idPlano: string, plano: AdicionarPlanoInput, ticketRequisicao: string): Promise<AtualizarPlanoResult | null>;
  atualizarStatusPlano(idPlano: string, estaAtivo: boolean, ticketRequisicao: string): Promise<PlanoStatusResult | null>;
}

export { IServicoPlano }