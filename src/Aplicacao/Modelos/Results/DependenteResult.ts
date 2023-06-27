import { AdicionarClienteResult, AtualizarClienteResult, ObterClienteResult } from "./ClienteResult";

class AdicionarDependenteResult {
  cliente: AdicionarClienteResult;
  id: string;
  idSocio: string;

  constructor(idSocio: string, cliente: AdicionarClienteResult, idDependente: string){
    this.idSocio = idSocio;
    this.cliente = cliente;
    this.id = idDependente;
  }
}

class AtualizarDependenteResult {
  cliente: AtualizarClienteResult;
  id: string;
  idSocio: string;

  constructor(idSocio: string, cliente: AtualizarClienteResult, idDependente: string){
    this.idSocio = idSocio;
    this.cliente = cliente;
    this.id = idDependente;
  }
}

class ObterDependenteResult {
  id: string;
  idSocio: string;
  cliente: ObterClienteResult;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, idSocio: string, cliente: ObterClienteResult, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.idSocio = idSocio;
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