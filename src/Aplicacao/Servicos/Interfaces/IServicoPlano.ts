import { ObterPlanoResult } from "../../Modelos/Results/PlanoResult"

interface IServicoPlano {
  ObterTodosOsPlanos() :Promise<ObterPlanoResult[] | null>;
  ObterPlanoPorId(idPlano: string, ticketRequisicao: string) :Promise<ObterPlanoResult | null>;
}

export { IServicoPlano }