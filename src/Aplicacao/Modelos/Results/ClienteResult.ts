class AdicionarClienteResult {
  nome: string;
  login: string;

  constructor(nome: string, login: string){
    this.nome = nome;
    this.login = login;
  }
}

class AtualizarClienteResult {
  nome: string;
  login: string;

  constructor(nome: string, login: string){
    this.nome = nome;
    this.login = login;
  }
}

class ObterClienteResult {
  id: string;
  nome: string;
  documento: string;
  login: string;
  email: string;
  ativo: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, nome: string, documento: string, login: string, email: string, ativo: boolean, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.nome = nome;
    this.documento = documento;
    this.login = login;
    this.email = email;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.ativo = ativo;
  }
}

export { AdicionarClienteResult, AtualizarClienteResult, ObterClienteResult }
