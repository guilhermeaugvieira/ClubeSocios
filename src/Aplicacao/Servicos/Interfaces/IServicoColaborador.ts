import { AdicionarColaboradorResult } from '../../Modelos/Results/ColaboradorResult';
import { AdicionarColaboradorInput, LoginColaboradorInput } from '../../Modelos/Inputs/ColaboradorInput';

interface IServicoColaborador{
  AdicionarColaborador(input: AdicionarColaboradorInput, ticketRequisicao: string) : Promise<AdicionarColaboradorResult | null>;
  LoginColaborador(input: LoginColaboradorInput, ticketRequisicao: string): Promise<string | null>;
}

export { IServicoColaborador }