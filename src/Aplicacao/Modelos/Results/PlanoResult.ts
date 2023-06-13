class AdicionarPlanoResult{
  
  nome: string;
  descricao: string;
  tipoRecorrencia: string;
  modalidade: string;
  valorMensalidade: number;
  id: string;

  constructor(nome: string, descricao: string, tipoRecorrencia: string, modalidade: string, valorMensalidade: number, id: string){
    this.nome = nome;
    this.descricao = descricao;
    this.tipoRecorrencia = tipoRecorrencia;
    this.modalidade = modalidade;
    this.valorMensalidade = valorMensalidade;
    this.id = id;
  }
}

class AtualizarPlanoResult {
  
  id: string;
  nome: string;
  descricao: string;
  tipoRecorrencia: string;
  modalidade: string;
  valorMensalidade: number;

  constructor(nome: string, descricao: string, tipoRecorrencia: string, modalidade: string, valorMensalidade: number, id: string){
    this.nome = nome;
    this.descricao = descricao;
    this.tipoRecorrencia = tipoRecorrencia;
    this.modalidade = modalidade;
    this.id = id;
    this.valorMensalidade = valorMensalidade;
  }
}

class ObterPlanoResult {
  id: string;
  nome: string;
  descricao: string;
  tipoRecorrencia: string;
  valorMensalidade: number;
  modalidade: string;
  ativo: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string, ativo: boolean, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.tipoRecorrencia = tipoRecorrencia;
    this.valorMensalidade = valorMensalidade;
    this.modalidade = modalidade;
    this.ativo = ativo;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }
}

class PlanoStatusResult {
  id: string;
  status: boolean;

  constructor(id: string, status: boolean){
    this.id = id;
    this.status = status;
  }
}

export { AdicionarPlanoResult, AtualizarPlanoResult, ObterPlanoResult, PlanoStatusResult }