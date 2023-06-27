import { AdicionarClienteResult, AtualizarClienteResult, ObterClienteResult } from "./ClienteResult";
import { ObterTodosDependentesResult } from "./DependenteResult";
import { AdicionarEnderecoResult, AtualizarEnderecoResult, ObterEnderecoResult } from "./EnderecoResult";
import { AdicionarPlanoResult, AtualizarPlanoResult, ObterPlanoResult } from "./PlanoResult";
import { ObterTodosVeiculosSocioResult} from "./VeiculoSocioResult";

class AdicionarSocioResult {
  
  id: string;
  contato: string;
  apelido: string | null;
  diaVencimentoPagamento: number;
  cliente: AdicionarClienteResult;
  plano: AdicionarPlanoResult;
  endereco: AdicionarEnderecoResult;

  constructor(apelido: string| null, diaVencimentoPagamento: number, id: string, cliente: AdicionarClienteResult, plano: AdicionarPlanoResult, endereco: AdicionarEnderecoResult, contato: string){
    this.apelido = apelido;
    this.diaVencimentoPagamento = diaVencimentoPagamento;
    this.cliente = cliente;
    this.plano = plano;
    this.endereco = endereco;
    this.id = id;
    this.contato = contato;
  }

}

class AtualizarSocioResult {

  id: string;
  contato: string;
  apelido: string | null;
  diaVencimentoPagamento: number;
  cliente: AtualizarClienteResult;
  plano: AtualizarPlanoResult;
  endereco: AtualizarEnderecoResult;

  constructor(apelido: string | null, diaVencimentoPagamento: number, cliente: AtualizarClienteResult, plano: AtualizarPlanoResult, endereco: AtualizarEnderecoResult, id: string, contato: string){
    this.apelido = apelido;
    this.diaVencimentoPagamento = diaVencimentoPagamento;
    this.cliente = cliente;
    this.plano = plano;
    this.endereco = endereco;
    this.id = id;
    this.contato = contato;
  }
}

class SocioStatusResult {
  id: string;
  status: boolean;

  constructor(id: string, status: boolean){
    this.id = id;
    this.status = status;
  }
}

class ObterSocioResult {
  
  id: string;
  apelido: string | null;
  diaVencimentoPagamento: number;
  contato: string;
  cliente: ObterClienteResult;
  plano: ObterPlanoResult;
  endereco: ObterEnderecoResult;
  dependentes: ObterTodosDependentesResult[];
  veiculos: ObterTodosVeiculosSocioResult[];
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, diaVencimentoPagamento: number, cliente: ObterClienteResult, plano: ObterPlanoResult, endereco: ObterEnderecoResult, 
    dataCriacao: Date, apelido: string | null, dataAtualizacao: Date | null, contato: string, dependentes: ObterTodosDependentesResult[], veiculos: ObterTodosVeiculosSocioResult[]){
    this.id = id;
    this.apelido = apelido;
    this.diaVencimentoPagamento = diaVencimentoPagamento;
    this.cliente = cliente;
    this.plano = plano;
    this.endereco = endereco;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.contato = contato;
    this.dependentes = dependentes;
    this.veiculos = veiculos;
  }
}

class ObterSocioSemDependentesResult {
  
  id: string;
  apelido: string | null;
  diaVencimentoPagamento: number;
  contato: string;
  cliente: ObterClienteResult;
  plano: ObterPlanoResult;
  endereco: ObterEnderecoResult;
  veiculos: ObterTodosVeiculosSocioResult[];
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, diaVencimentoPagamento: number, cliente: ObterClienteResult, plano: ObterPlanoResult, endereco: ObterEnderecoResult, 
    dataCriacao: Date, apelido: string | null, dataAtualizacao: Date | null, contato: string, veiculos: ObterTodosVeiculosSocioResult[]){
    this.id = id;
    this.apelido = apelido;
    this.diaVencimentoPagamento = diaVencimentoPagamento;
    this.cliente = cliente;
    this.plano = plano;
    this.endereco = endereco;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.contato = contato;
    this.veiculos = veiculos;
  }
}

class ObterSocioSemVeiculosResult {
  
  id: string;
  apelido: string | null;
  diaVencimentoPagamento: number;
  contato: string;
  cliente: ObterClienteResult;
  plano: ObterPlanoResult;
  endereco: ObterEnderecoResult;
  dependentes: ObterTodosDependentesResult[];
  dataCriacao: Date;
  dataAtualizacao: Date | null;

  constructor(id: string, diaVencimentoPagamento: number, cliente: ObterClienteResult, plano: ObterPlanoResult, endereco: ObterEnderecoResult, 
    dataCriacao: Date, apelido: string | null, dataAtualizacao: Date | null, contato: string, dependentes: ObterTodosDependentesResult[]){
    this.id = id;
    this.apelido = apelido;
    this.diaVencimentoPagamento = diaVencimentoPagamento;
    this.cliente = cliente;
    this.plano = plano;
    this.endereco = endereco;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.contato = contato;
    this.dependentes = dependentes;
  }
}

export { AdicionarSocioResult, AtualizarSocioResult, SocioStatusResult, ObterSocioResult, ObterSocioSemDependentesResult, ObterSocioSemVeiculosResult }
