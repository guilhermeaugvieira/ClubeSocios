import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioSocio } from "../../../Dados/Interfaces/IRepositorioSocio";
import { IRepositorioVeiculoSocio } from "../../../Dados/Interfaces/IRepositorioVeiculoSocio";
import { AdicionarVeiculoSocioInput, AtualizarVeiculoSocioInput } from "../../Modelos/Inputs/VeiculoSocioInput";
import { ObterClienteResult } from "../../Modelos/Results/ClienteResult";
import { ObterTodosDependentesResult } from "../../Modelos/Results/DependenteResult";
import { ObterEnderecoResult } from "../../Modelos/Results/EnderecoResult";
import { ObterPlanoResult } from "../../Modelos/Results/PlanoResult";
import { ObterSocioSemVeiculosResult } from "../../Modelos/Results/SocioResult";
import { AdicionarVeiculoSocioResult, AtualizarVeiculoSocioResult, ObterTodosVeiculosSocioResult, ObterVeiculoSocioResult, VeiculoSocioStatusResult } from "../../Modelos/Results/VeiculoSocioResult";
import { IServicoVeiculoSocio } from "../Interfaces/IServicoVeiculoSocio";

@injectable()
class ServicoVeiculoSocio implements IServicoVeiculoSocio {
  
  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;
  private readonly _repositorioSocio: IRepositorioSocio;
  private readonly _repositorioVeiculoSocio: IRepositorioVeiculoSocio;

  constructor(    
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
    @inject("RepositorioSocio") repositorioSocio: IRepositorioSocio,
    @inject("RepositorioVeiculoSocio") repositorioVeiculoSocio: IRepositorioVeiculoSocio,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
    this._repositorioSocio = repositorioSocio;
    this._repositorioVeiculoSocio = repositorioVeiculoSocio;
  }

  adicionarVeiculo = async (input: AdicionarVeiculoSocioInput, ticketRequisicao: string, idSocio: string) : Promise<AdicionarVeiculoSocioResult | null> => {
    const socioEncontrado = await this._repositorioSocio.obterSocioComPlanoEnderecoClienteVeiculosEDependentesComClientePeloId(idSocio);

    if(Validadores.ehValorInvalido(socioEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    const veiculoEncontrado = await this._repositorioVeiculoSocio.obterVeiculoSocioPelaPlaca(input.placa);

    if(!Validadores.ehValorInvalido(veiculoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Placa já foi cadastrada", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let respostaAdicao: AdicionarVeiculoSocioResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const veiculoAdicionado = await this._repositorioVeiculoSocio.adicionarVeiculoSocio(tx, input.placa, idSocio);

      respostaAdicao = new AdicionarVeiculoSocioResult(veiculoAdicionado!.Id, veiculoAdicionado!.Placa,
        new ObterSocioSemVeiculosResult(socioEncontrado!.Id, socioEncontrado!.DiaVencimentoPagamento,
          new ObterClienteResult(socioEncontrado!.Cliente.Id, socioEncontrado!.Cliente.Nome, socioEncontrado!.Cliente.Documento,
            socioEncontrado!.Cliente.Login, socioEncontrado!.Cliente.Email, socioEncontrado!.Cliente.Ativo, socioEncontrado!.Cliente.DataCriacao,socioEncontrado!.Cliente.DataAtualizacao),
          new ObterPlanoResult(socioEncontrado!.Plano.Id, socioEncontrado!.Plano.Nome, socioEncontrado!.Plano.Descricao, socioEncontrado!.Plano.TipoRecorrencia, 
            socioEncontrado!.Plano.ValorMensalidade.toNumber(), socioEncontrado!.Plano.Modalidade, socioEncontrado!.Plano.Ativo, socioEncontrado!.Plano.DataCriacao, socioEncontrado!.Plano.DataAtualizacao),
          new ObterEnderecoResult(socioEncontrado!.Endereco.Id, socioEncontrado!.Endereco.Pais, socioEncontrado!.Endereco.Cidade, socioEncontrado!.Endereco.Cep, socioEncontrado!.Endereco.Bairro, 
            socioEncontrado!.Endereco.Rua, socioEncontrado!.Endereco.DataCriacao, socioEncontrado!.Endereco.Numero, socioEncontrado!.Endereco.DataAtualizacao),
            socioEncontrado!.DataCriacao, socioEncontrado!.Apelido, socioEncontrado!.DataAtualizacao, socioEncontrado!.Contato,
          socioEncontrado!.Dependentes.map(p => new ObterTodosDependentesResult(p.Id, 
            new ObterClienteResult(p.Cliente.Id, p.Cliente.Nome, p.Cliente.Documento, p.Cliente.Login, p.Cliente.Email, p.Cliente.Ativo, p.Cliente.DataCriacao, p.Cliente.DataAtualizacao),
            p.DataCriacao, p.DataAtualizacao)
          )
        ) 
      )
    });

    return respostaAdicao;
  }

  atualizarVeiculo = async (input: AtualizarVeiculoSocioInput, ticketRequisicao: string, idSocio: string, idVeiculo: string) : Promise<AtualizarVeiculoSocioResult | null> => {
    const socioEncontrado = await this._repositorioSocio.obterSocioComPlanoEnderecoClienteVeiculosEDependentesComClientePeloId(idSocio);

    if(Validadores.ehValorInvalido(socioEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    const veiculoEncontrado = await this._repositorioVeiculoSocio.obterVeiculoSocioPorId(idVeiculo);

    if(Validadores.ehValorInvalido(veiculoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Veículo não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }
    
    const veiculoVerificado = await this._repositorioVeiculoSocio.obterVeiculoSocioPelaPlaca(input.placa);

    if(!Validadores.ehValorInvalido(veiculoVerificado)){
      this._notificador.adicionarNotificacao(new Notificacao("Placa já foi cadastrada", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    if(!Validadores.ehIgual(socioEncontrado!.Id, veiculoEncontrado!.Socio.Id)){
      this._notificador.adicionarNotificacao(new Notificacao("Veículo não está associado ao sócio", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        
      return null;
    }

    let respostaAdicao: AdicionarVeiculoSocioResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const veiculoAtualizado = await this._repositorioVeiculoSocio.atualizarVeiculoSocio(tx, input.placa, idVeiculo)

      respostaAdicao = new AdicionarVeiculoSocioResult(veiculoAtualizado!.Id, veiculoAtualizado!.Placa,
        new ObterSocioSemVeiculosResult(socioEncontrado!.Id, socioEncontrado!.DiaVencimentoPagamento,
          new ObterClienteResult(socioEncontrado!.Cliente.Id, socioEncontrado!.Cliente.Nome, socioEncontrado!.Cliente.Documento,
            socioEncontrado!.Cliente.Login, socioEncontrado!.Cliente.Email, socioEncontrado!.Cliente.Ativo, socioEncontrado!.Cliente.DataCriacao,socioEncontrado!.Cliente.DataAtualizacao),
          new ObterPlanoResult(socioEncontrado!.Plano.Id, socioEncontrado!.Plano.Nome, socioEncontrado!.Plano.Descricao, socioEncontrado!.Plano.TipoRecorrencia, 
            socioEncontrado!.Plano.ValorMensalidade.toNumber(), socioEncontrado!.Plano.Modalidade, socioEncontrado!.Plano.Ativo, socioEncontrado!.Plano.DataCriacao, socioEncontrado!.Plano.DataAtualizacao),
          new ObterEnderecoResult(socioEncontrado!.Endereco.Id, socioEncontrado!.Endereco.Pais, socioEncontrado!.Endereco.Cidade, socioEncontrado!.Endereco.Cep, socioEncontrado!.Endereco.Bairro, 
            socioEncontrado!.Endereco.Rua, socioEncontrado!.Endereco.DataCriacao, socioEncontrado!.Endereco.Numero, socioEncontrado!.Endereco.DataAtualizacao),
            socioEncontrado!.DataCriacao, socioEncontrado!.Apelido, socioEncontrado!.DataAtualizacao, socioEncontrado!.Contato,
          socioEncontrado!.Dependentes.map(p => new ObterTodosDependentesResult(p.Id, 
            new ObterClienteResult(p.Cliente.Id, p.Cliente.Nome, p.Cliente.Documento, p.Cliente.Login, p.Cliente.Email, p.Cliente.Ativo, p.Cliente.DataCriacao, p.Cliente.DataAtualizacao),
            p.DataCriacao, p.DataAtualizacao)
          )
        ) 
      )
    });

    return respostaAdicao;
  }

  alterarStatusAtivo = async (ticketRequisicao: string, idVeiculo: string, estaAtivo: boolean): Promise<VeiculoSocioStatusResult | null> => {
    const veiculoEncontrado = await this._repositorioVeiculoSocio.obterVeiculoSocioPorId(idVeiculo)

    if(Validadores.ehValorInvalido(veiculoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Veículo não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }
    
    if(Validadores.ehIgual(veiculoEncontrado!.Ativo, estaAtivo)){
      this._notificador.adicionarNotificacao(new Notificacao(`Veículo já está ${this.obterStatus(estaAtivo)}`, TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let resposta: VeiculoSocioStatusResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const veiculoAtualizado = await this._repositorioVeiculoSocio.atualizarStatusAtivoVeiculoSocio(tx, estaAtivo, idVeiculo);
    
      resposta = new VeiculoSocioStatusResult(idVeiculo, veiculoAtualizado.Ativo);
    });
        
    return resposta;
  };

  obterVeiculoPorId = async(ticketRequisicao: string, idVeiculo: string) : Promise<ObterVeiculoSocioResult | null> => {
    const veiculoEncontrado = await this._repositorioVeiculoSocio.obterVeiculoSocioPorId(idVeiculo);

    if(Validadores.ehValorInvalido(veiculoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao(`Veículo não foi encontrado`, TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    const resposta = new ObterVeiculoSocioResult(veiculoEncontrado!.Id, veiculoEncontrado!.Placa, veiculoEncontrado!.Ativo,
      new ObterSocioSemVeiculosResult(veiculoEncontrado!.Socio.Id, veiculoEncontrado!.Socio.DiaVencimentoPagamento, 
        new ObterClienteResult(veiculoEncontrado!.Socio.Cliente.Id, veiculoEncontrado!.Socio.Cliente.Nome, veiculoEncontrado!.Socio.Cliente.Documento,
          veiculoEncontrado!.Socio.Cliente.Login, veiculoEncontrado!.Socio.Cliente.Email, veiculoEncontrado!.Socio.Cliente.Ativo, veiculoEncontrado!.Socio.Cliente.DataCriacao,veiculoEncontrado!.Socio.Cliente.DataAtualizacao),
        new ObterPlanoResult(veiculoEncontrado!.Socio.Plano.Id, veiculoEncontrado!.Socio.Plano.Nome, veiculoEncontrado!.Socio.Plano.Descricao, veiculoEncontrado!.Socio.Plano.TipoRecorrencia, 
          veiculoEncontrado!.Socio.Plano.ValorMensalidade.toNumber(), veiculoEncontrado!.Socio.Plano.Modalidade, veiculoEncontrado!.Socio.Plano.Ativo, 
          veiculoEncontrado!.Socio.Plano.DataCriacao, veiculoEncontrado!.Socio.Plano.DataAtualizacao),
        new ObterEnderecoResult(veiculoEncontrado!.Socio.Endereco.Id, veiculoEncontrado!.Socio.Endereco.Pais, veiculoEncontrado!.Socio.Endereco.Cidade, 
          veiculoEncontrado!.Socio.Endereco.Cep, veiculoEncontrado!.Socio.Endereco.Bairro, veiculoEncontrado!.Socio.Endereco.Rua, 
          veiculoEncontrado!.Socio.Endereco.DataCriacao,veiculoEncontrado!.Socio.Endereco.Numero, veiculoEncontrado!.Socio.Endereco.DataAtualizacao),
          veiculoEncontrado!.Socio.DataCriacao, veiculoEncontrado!.Socio.Apelido, veiculoEncontrado!.Socio.DataAtualizacao, veiculoEncontrado!.Socio.Contato,
          veiculoEncontrado!.Socio.Dependentes.map(p => new ObterTodosDependentesResult(p.Id, 
            new ObterClienteResult(p.Cliente.Id, p.Cliente.Nome, p.Cliente.Documento, p.Cliente.Login, p.Cliente.Email, p.Cliente.Ativo, p.Cliente.DataCriacao, p.Cliente.DataAtualizacao),
            p.DataCriacao, p.DataAtualizacao))
      ), 
      veiculoEncontrado!.DataCriacao, veiculoEncontrado!.DataAtualizacao
    );

    return resposta;
  }

  private obterStatus = (status: boolean) => status ? 'habilitado' : 'desabilitado';

}

export { ServicoVeiculoSocio }