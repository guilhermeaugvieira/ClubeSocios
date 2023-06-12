import { ObterPlanoResult } from "../../Modelos/Results/PlanoResult"

interface IServicoPlano {
  obterTodosOsPlanos() :Promise<ObterPlanoResult[] | null>;
  obterPlanoPorId(idPlano: string, ticketRequisicao: string) :Promise<ObterPlanoResult | null>;
}

export { IServicoPlano }