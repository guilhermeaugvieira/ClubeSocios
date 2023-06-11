class AdicionarPlanoResult{
  
  nome: string;
  descricao: string;
  tipoRecorrencia: string;
  modalidade: string;
  id: string;

  constructor(nome: string, descricao: string, tipoRecorrencia: string, modalidade: string, id: string){
    this.nome = nome;
    this.descricao = descricao;
    this.tipoRecorrencia = tipoRecorrencia;
    this.modalidade = modalidade;
    this.id = id;
  }
}

class AtualizarPlanoResult {
  
  nome: string;
  descricao: string;
  tipoRecorrencia: string;
  modalidade: string;

  constructor(nome: string, descricao: string, tipoRecorrencia: string, modalidade: string){
    this.nome = nome;
    this.descricao = descricao;
    this.tipoRecorrencia = tipoRecorrencia;
    this.modalidade = modalidade;
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

export { AdicionarPlanoResult, AtualizarPlanoResult, ObterPlanoResult }