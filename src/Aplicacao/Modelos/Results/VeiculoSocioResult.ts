class AdicionarVeiculoSocioResult {
  id: string;
  placa: string;
  idSocio: string;

  constructor(id: string, placa: string, idSocio: string){
    this.id = id;
    this.placa = placa;
    this.idSocio = idSocio;
  }
}

class AtualizarVeiculoSocioResult {
  id: string;
  placa: string;
  idSocio: string;

  constructor(id: string, placa: string, idSocio: string){
    this.id = id;
    this.placa = placa;
    this.idSocio = idSocio;
  }
}

class VeiculoSocioStatusResult {
  id: string;
  status: boolean;

  constructor(id: string, status: boolean){
    this.id = id;
    this.status = status;
  }
}

class ObterTodosVeiculosSocioResult {
  id: string;
  placa: string;
  ativo: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, placa: string, ativo: boolean, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.placa = placa;
    this.ativo = ativo;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }
}

class ObterVeiculoSocioResult {
  id: string;
  placa: string;
  ativo: boolean;
  idSocio: string;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, placa: string, ativo: boolean, idSocio: string, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.placa = placa;
    this.ativo = ativo;
    this.idSocio = idSocio;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }
}

export { AdicionarVeiculoSocioResult, AtualizarVeiculoSocioResult, VeiculoSocioStatusResult, ObterTodosVeiculosSocioResult, ObterVeiculoSocioResult }