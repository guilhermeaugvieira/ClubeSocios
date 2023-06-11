class AdicionarPapelResult {

  nome: string;
  id: string;

  constructor(nome: string, id: string){
    this.nome = nome;
    this.id = id;
  }
}

class ObterPapelResult {
  id: string;
  nome: string;
  ativo: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, nome: string, ativo: boolean, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.nome = nome;
    this.ativo = ativo;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }
}

export { AdicionarPapelResult, ObterPapelResult }
