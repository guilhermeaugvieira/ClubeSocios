import { Cliente, Dependente, PrismaClient, Socio } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioCliente } from "../../../Dados/Interfaces/IRepositorioCliente";
import { IRepositorioDependente } from "../../../Dados/Interfaces/IRepositorioDependente";
import { IRepositorioSocio } from "../../../Dados/Interfaces/IRepositorioSocio";
import { Hash } from "../../../Infra/Hash";
import { AdicionarDependenteInput, AtualizarDependenteInput } from "../../Modelos/Inputs/DependenteInput";
import { AdicionarClienteResult, AtualizarClienteResult, ObterClienteResult } from "../../Modelos/Results/ClienteResult";
import { AdicionarDependenteResult, AtualizarDependenteResult, DependenteStatusResult, ObterDependenteResult } from "../../Modelos/Results/DependenteResult";
import { IServicoDependente } from "../Interfaces/IServicoDependente";

@injectable()
class ServicoDependente implements IServicoDependente {
  
  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;
  private readonly _repositorioCliente: IRepositorioCliente;
  private readonly _repositorioDependente: IRepositorioDependente;
  private readonly _repositorioSocio: IRepositorioSocio;

  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
    @inject("RepositorioCliente") repositorioCliente: IRepositorioCliente,
    @inject("RepositorioDependente") repositorioDependente: IRepositorioDependente,
    @inject("RepositorioSocio") repositorioSocio: IRepositorioSocio,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
    this._repositorioCliente = repositorioCliente;
    this._repositorioDependente = repositorioDependente;
    this._repositorioSocio = repositorioSocio;
  }

  adicionarDependente = async (input: AdicionarDependenteInput, idSocio: string, ticketRequisicao: string) : Promise<AdicionarDependenteResult | null> => {
    let cliente: Cliente | null = null;
    let dependente: Dependente | null = null;

    const socio = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }
    
    if(Validadores.textoComComprimentoEntre(input.idCliente, 36)){
      cliente = await this._repositorioCliente.obterClientePorId(input.idCliente!);

      if(Validadores.ehValorInvalido(cliente)){
        this._notificador.adicionarNotificacao(new Notificacao("Id do cliente fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
        return null;
      }

      if(Validadores.ehIgual(cliente!.Ativo, false)){
        this._notificador.adicionarNotificacao(new Notificacao("Cliente encontrado está inativo, para associação o cliente deve estar ativo", 
          TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        
        return null;
      }

      dependente = await this._repositorioDependente.obterDependentePorIdDoCliente(cliente!.Id);
      
      if(!Validadores.ehValorInvalido(dependente)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe dependente associado ao cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    if(Validadores.ehValorInvalido(cliente) && !Validadores.ehValorInvalido(input.cliente)){
      cliente = await this._repositorioCliente.obterClientePorDocumento(input.cliente!.documento);

      if(!Validadores.ehValorInvalido(cliente)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe cliente com o documento fornecido", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }

      cliente = await this._repositorioCliente.obterClientePorEmail(input.cliente!.email);

      if(!Validadores.ehValorInvalido(cliente)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe cliente com o email cadastrado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }

      cliente = await this._repositorioCliente.obterClientePorLogin(input.cliente!.login);

      if(!Validadores.ehValorInvalido(cliente)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe cliente com o login cadastrado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    let dependenteResultante: AdicionarDependenteResult | null = null;

    await this._databaseManager.$transaction(async (tx) => {
      if(Validadores.ehValorInvalido(cliente) && !Validadores.ehValorInvalido(input.cliente))
        cliente = await this._repositorioCliente.adicionarCliente(tx,
        input.cliente!.documento, input.cliente!.nome, input.cliente!.email,
        input.cliente!.login, Hash.criptografarTexto(input.cliente!.senha)
      );

      dependente = await this._repositorioDependente.adicionarDependente(tx, cliente!.Id, idSocio);

      dependenteResultante = new AdicionarDependenteResult(
        socio!.Id,
        new AdicionarClienteResult(cliente!.Nome, cliente!.Login),
        dependente!.Id,
      );
    });

    return dependenteResultante;
  }

  atualizarDependente = async (input: AtualizarDependenteInput, idSocio: string, idDependente: string, ticketRequisicao: string) : Promise<AtualizarDependenteResult | null> => {
    let cliente: Cliente | null = null;

    const socio = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }

    const dependente = await this._repositorioDependente.obterDependenteComClientePorIdDoDependente(idDependente);

    if(Validadores.ehValorInvalido(dependente)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do dependente fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }

    if(!Validadores.ehIgual(socio!.Id, dependente!.FkSocio)){
      this._notificador.adicionarNotificacao(new Notificacao("Dependente não está associado ao sócio", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        
      return null;
    }

    if(Validadores.ehValorInvalido(cliente) && !Validadores.ehValorInvalido(input.cliente)){
      cliente = await this._repositorioCliente.obterClientePorDocumento(input.cliente!.documento);

      if(!Validadores.ehValorInvalido(cliente) && !Validadores.ehIgual(cliente!.Id, dependente!.Cliente.Id)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe cliente com o documento fornecido", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }

      cliente = await this._repositorioCliente.obterClientePorEmail(input.cliente!.email);

      if(!Validadores.ehValorInvalido(cliente) && !Validadores.ehIgual(cliente!.Id, dependente!.Cliente.Id)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe cliente com o email cadastrado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }

      cliente = await this._repositorioCliente.obterClientePorLogin(input.cliente!.login);

      if(!Validadores.ehValorInvalido(cliente) && !Validadores.ehIgual(cliente!.Id, dependente!.Cliente.Id)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe cliente com o login cadastrado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    let dependenteResultante : AtualizarDependenteResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const clienteAtualizado = await this._repositorioCliente.atualizarDadosCliente(tx,
        input.cliente!.documento, input.cliente!.nome, input.cliente!.email,
        input.cliente!.login, dependente!.Cliente.Id);

      await this._repositorioDependente.atualizarDependente(tx, idDependente);

      dependenteResultante = new AtualizarDependenteResult(
        socio!.Id,
        new AtualizarClienteResult(clienteAtualizado!.Nome, clienteAtualizado!.Login),
        dependente!.Id
      );
    });

    return dependenteResultante;
  }

  alterarStatusAtivo = async (ticketRequisicao: string, idSocio: string, idDependente: string, estaAtivo: boolean): Promise<DependenteStatusResult | null> => {
    const socio = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }
    
    const dependenteEncontrado = await this._repositorioDependente.obterDependenteComClientePorIdDoDependente(idDependente)

    if(Validadores.ehValorInvalido(dependenteEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Dependente não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    if(!Validadores.ehIgual(dependenteEncontrado!.FkSocio, idSocio)){
      this._notificador.adicionarNotificacao(new Notificacao(`Dependente não está associado ao sócio`, TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }
    
    if(Validadores.ehIgual(dependenteEncontrado!.Cliente.Ativo, estaAtivo)){
      this._notificador.adicionarNotificacao(new Notificacao(`Dependente já está ${this.obterStatus(estaAtivo)}`, TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let resposta: DependenteStatusResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const clienteAtualizado = await this._repositorioCliente.alterarStatusAtivo(tx, estaAtivo, dependenteEncontrado!.Cliente.Id);

      await this._repositorioDependente.atualizarDependente(tx, idDependente);
    
      resposta = new DependenteStatusResult(idDependente, clienteAtualizado.Ativo);
    });
        
    return resposta;
  };

  obterDependentePorId = async(idDependente: string, idSocio: string, ticketRequisicao: string) : Promise<ObterDependenteResult | null> => {
    const socio = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }
    
    const dependenteEncontrado = await this._repositorioDependente.obterDependenteComClientePorIdDoDependente(idDependente);

    if(Validadores.ehValorInvalido(dependenteEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao(`Dependente não foi encontrado`, TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    if(!Validadores.ehIgual(dependenteEncontrado!.FkSocio, idSocio)){
      this._notificador.adicionarNotificacao(new Notificacao(`Dependente não está associado ao sócio`, TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    const resposta = new ObterDependenteResult(dependenteEncontrado!.Id, dependenteEncontrado!.FkSocio,
        new ObterClienteResult(dependenteEncontrado!.Cliente.Id, dependenteEncontrado!.Cliente.Nome, dependenteEncontrado!.Cliente.Documento, dependenteEncontrado!.Cliente.Login, dependenteEncontrado!.Cliente.Email,
          dependenteEncontrado!.Cliente.Ativo, dependenteEncontrado!.Cliente.DataCriacao, dependenteEncontrado!.Cliente.DataAtualizacao),
          dependenteEncontrado!.DataCriacao, dependenteEncontrado!.DataAtualizacao);

    return resposta;
  }

  obterDependentesPorSocio = async(idSocio: string, ticketRequisicao: string) : Promise<ObterDependenteResult[] | null> => {
    const socio = await this._repositorioSocio.obterSocioPorId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Id do socio fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
      return null;
    }
    
    const dependentesEncontrados = await this._repositorioDependente.obterDependentesComClientePorIdDoSocio(idSocio);

    if(dependentesEncontrados.length === 0)
      return null;

    
    const resposta = dependentesEncontrados.map(p => new ObterDependenteResult(p!.Id, p!.FkSocio,
      new ObterClienteResult(p!.Cliente.Id, p!.Cliente.Nome, p!.Cliente.Documento, p!.Cliente.Login, p!.Cliente.Email,
        p!.Cliente.Ativo, p!.Cliente.DataCriacao, p!.Cliente.DataAtualizacao),
        p!.DataCriacao, p!.DataAtualizacao));

    return resposta;
  }

  private obterStatus = (status: boolean) => status ? 'habilitado' : 'desabilitado';
}

export { ServicoDependente }