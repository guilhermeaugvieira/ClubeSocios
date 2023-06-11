class AdicionarEnderecoResult {

  pais: string;
  cidade: string;
  cep: string;

  constructor(pais: string, cidade: string, cep: string){
    this.pais = pais;
    this.cidade = cidade;
    this.cep = cep;
  }
}

class AtualizarEnderecoResult {

  pais: string;
  cidade: string;
  cep: string;

  constructor(pais: string, cidade: string, cep: string){
    this.pais = pais;
    this.cidade = cidade;
    this.cep = cep;
  }
}

class ObterEnderecoResult {
  id: string;
  pais: string;
  cidade: string;
  cep: string;
  bairro: string;
  rua: string;
  numero: number | null = null;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, pais: string, cidade: string, cep: string, bairro: string, rua: string, dataCriacao: Date, numero: number | null, dataAtualizacao: Date | null){
    this.id = id;
    this.pais = pais;
    this.cidade = cidade;
    this.cep = cep;
    this.bairro = bairro;
    this.rua = rua;
    this.numero = numero;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }
}

export { AdicionarEnderecoResult, AtualizarEnderecoResult, ObterEnderecoResult }