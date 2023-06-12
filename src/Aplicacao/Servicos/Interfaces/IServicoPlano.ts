import { AdicionarPlanoInput } from "../../Modelos/Inputs/PlanoInput";
import { AtualizarPlanoResult, ObterPlanoResult } from "../../Modelos/Results/PlanoResult"

interface IServicoPlano {
  obterTodosOsPlanos() :Promise<ObterPlanoResult[] | null>;
  obterPlanoPorId(idPlano: string, ticketRequisicao: string) :Promise<ObterPlanoResult | null>;
  adicionarPlano(plano: AdicionarPlanoInput, ticketRequisicao: string): Promise<ObterPlanoResult | null>;
  atualizarPlano(idPlano: string, plano: AdicionarPlanoInput, ticketRequisicao: string): Promise<AtualizarPlanoResult | null>;
}

export { IServicoPlano }