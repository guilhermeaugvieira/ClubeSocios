import { AdicionarClienteResult } from "./ClienteResult";
import { AdicionarPapelResult } from "./PapelResult";

class AdicionarColaboradorResult{
  cliente: AdicionarClienteResult;
  papel: AdicionarPapelResult;

  constructor(cliente: AdicionarClienteResult, papel: AdicionarPapelResult){
    this.cliente = cliente;
    this.papel = papel;
  }
}

export { AdicionarColaboradorResult }

