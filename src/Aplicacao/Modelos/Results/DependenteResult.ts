import { AdicionarClienteResult, AtualizarClienteResult, ObterClienteResult } from "./ClienteResult";
import { ObterSocioResult, ObterSocioSemDependentesResult } from "./SocioResult";

class AdicionarDependenteResult {
  socio: ObterSocioSemDependentesResult;
  cliente: AdicionarClienteResult;
  id: string;

  constructor(socio: ObterSocioSemDependentesResult, cliente: AdicionarClienteResult, idDependente: string){
    this.socio = socio;
    this.cliente = cliente;
    this.id = idDependente;
  }
}

class AtualizarDependenteResult {
  socio: ObterSocioSemDependentesResult;
  cliente: AtualizarClienteResult;
  id: string;

  constructor(socio: ObterSocioSemDependentesResult, cliente: AtualizarClienteResult, idDependente: string){
    this.socio = socio;
    this.cliente = cliente;
    this.id = idDependente;
  }
}

class ObterDependenteResult {
  id: string;
  socio: ObterSocioSemDependentesResult;
  cliente: ObterClienteResult;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, socio: ObterSocioSemDependentesResult, cliente: ObterClienteResult, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.socio = socio;
    this.cliente = cliente;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }

}

class ObterTodosDependentesResult {
  id: string;
  cliente: ObterClienteResult;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, cliente: ObterClienteResult, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.cliente = cliente;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }

}

class DependenteStatusResult {
  id: string;
  status: boolean;

  constructor(id: string, status: boolean){
    this.id = id;
    this.status = status;
  }
}

export { AdicionarDependenteResult, AtualizarDependenteResult, ObterDependenteResult, DependenteStatusResult, ObterTodosDependentesResult };