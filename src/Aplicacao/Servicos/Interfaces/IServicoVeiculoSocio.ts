import { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput } from "../../Modelos/Inputs/VeiculoSocioInput";
import { AdicionarVeiculoSocioResult, AtualizarVeiculoSocioResult, ObterVeiculoSocioResult, VeiculoSocioStatusResult } from "../../Modelos/Results/VeiculoSocioResult";

interface IServicoVeiculoSocio {
  adicionarVeiculo(input: AdicionarVeiculoSocioInput, ticketRequisicao: string, idSocio: string) : Promise<AdicionarVeiculoSocioResult | null>;
  atualizarVeiculo(input: AtualizarVeiculoSocioInput, ticketRequisicao: string, idSocio: string, idVeiculo: string) : Promise<AtualizarVeiculoSocioResult | null>;
  alterarStatusAtivo(ticketRequisicao: string, idVeiculo: string, estaAtivo: boolean): Promise<VeiculoSocioStatusResult | null>;
  obterVeiculoPorId(ticketRequisicao: string, idVeiculo: string) : Promise<ObterVeiculoSocioResult | null>;
}

export { IServicoVeiculoSocio };