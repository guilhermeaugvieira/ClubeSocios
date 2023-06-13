import { AdicionarColaboradorResult } from '../../Modelos/Results/ColaboradorResult';
import { AdicionarColaboradorInput, LoginColaboradorInput } from '../../Modelos/Inputs/ColaboradorInput';

interface IServicoColaborador{
  adicionarColaborador(input: AdicionarColaboradorInput, ticketRequisicao: string) : Promise<AdicionarColaboradorResult | null>;
  loginColaborador(input: LoginColaboradorInput, ticketRequisicao: string): Promise<string | null>;
}

export { IServicoColaborador }