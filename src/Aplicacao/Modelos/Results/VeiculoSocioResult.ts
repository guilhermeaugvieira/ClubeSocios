import { ObterSocioSemVeiculosResult } from "./SocioResult";

class AdicionarVeiculoSocioResult {
  id: string;
  placa: string;
  socio: ObterSocioSemVeiculosResult;

  constructor(id: string, placa: string, socio: ObterSocioSemVeiculosResult){
    this.id = id;
    this.placa = placa;
    this.socio = socio;
  }
}

class AtualizarVeiculoSocioResult {
  id: string;
  placa: string;
  socio: ObterSocioSemVeiculosResult;

  constructor(id: string, placa: string, socio: ObterSocioSemVeiculosResult){
    this.id = id;
    this.placa = placa;
    this.socio = socio;
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
  socio: ObterSocioSemVeiculosResult;
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, placa: string, ativo: boolean, socio: ObterSocioSemVeiculosResult, dataCriacao: Date, dataAtualizacao: Date | null){
    this.id = id;
    this.placa = placa;
    this.ativo = ativo;
    this.socio = socio;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
  }
}

export { AdicionarVeiculoSocioResult, AtualizarVeiculoSocioResult, VeiculoSocioStatusResult, ObterTodosVeiculosSocioResult, ObterVeiculoSocioResult }