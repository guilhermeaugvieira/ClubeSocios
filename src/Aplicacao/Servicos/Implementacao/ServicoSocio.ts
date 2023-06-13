import { Cliente, Endereco, Plano, PrismaClient, Socio } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioCliente } from "../../../Dados/Interfaces/IRepositorioCliente";
import { IRepositorioEndereco } from "../../../Dados/Interfaces/IRepositorioEndereco";
import { IRepositorioPlano } from "../../../Dados/Interfaces/IRepositorioPlano";
import { IRepositorioSocio } from "../../../Dados/Interfaces/IRepositorioSocio";
import { Hash } from "../../../Infra/Hash";
import { AdicionarSocioInput, AtualizarSocioInput } from "../../Modelos/Inputs/SocioInput";
import { AdicionarClienteResult, AtualizarClienteResult, ObterClienteResult } from "../../Modelos/Results/ClienteResult";
import { AdicionarEnderecoResult, AtualizarEnderecoResult, ObterEnderecoResult } from "../../Modelos/Results/EnderecoResult";
import { AdicionarPlanoResult, AtualizarPlanoResult, ObterPlanoResult } from "../../Modelos/Results/PlanoResult";
import { AdicionarSocioResult, AtualizarSocioResult, ObterSocioResult, SocioStatusResult } from "../../Modelos/Results/SocioResult";
import { IServicoSocio } from "../Interfaces/IServicoSocio";

@injectable()
class ServicoSocio implements IServicoSocio {
  
  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;
  private readonly _repositorioPlano: IRepositorioPlano;
  private readonly _repositorioCliente: IRepositorioCliente;
  private readonly _repositorioSocio: IRepositorioSocio;
  private readonly _repositorioEndereco: IRepositorioEndereco;
  
  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
    @inject("RepositorioPlano") repositorioPlano: IRepositorioPlano,
    @inject("RepositorioCliente") repositorioCliente: IRepositorioCliente,
    @inject("RepositorioSocio") repositorioSocio: IRepositorioSocio,
    @inject("RepositorioEndereco") repositorioEndereco: IRepositorioEndereco,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
    this._repositorioPlano = repositorioPlano;
    this._repositorioCliente = repositorioCliente;
    this._repositorioSocio = repositorioSocio;
    this._repositorioEndereco = repositorioEndereco;
  }
  
  adicionarSocio = async (input: AdicionarSocioInput, ticketRequisicao: string): Promise<AdicionarSocioResult | null> => {

    let plano: Plano | null = null;
    let socio: Socio | null = null;
    let cliente: Cliente | null = null;
    let endereco: Endereco | null = null;

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

      socio = await this._repositorioSocio.obterSocioPorIdDoCliente(cliente!.Id);
      
      if(!Validadores.ehValorInvalido(socio)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe socio associado ao cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
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

    if(Validadores.textoComComprimentoEntre(input.idPlano, 36)){
      plano = await this._repositorioPlano.obterPlanoPorId(input.idPlano!);

      if(Validadores.ehValorInvalido(plano)){
        this._notificador.adicionarNotificacao(new Notificacao("Id do plano fornecido não foi encontrado", 
          TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
        return null;
      }

      if(Validadores.ehIgual(plano!.Ativo, false)){
        this._notificador.adicionarNotificacao(new Notificacao("O sócio deve estar associado a um plano ativo", 
          TipoNotificacao.RegraDeNegocio, this, ticketRequisicao))
        
        return null;
      }
    }

    if(Validadores.ehValorInvalido(plano) && !Validadores.ehValorInvalido(input.plano)){
      plano = await this._repositorioPlano.obterPlanoPorNome(input.plano!.nome);

      if(!Validadores.ehValorInvalido(plano) && Validadores.ehIgual(plano!.Ativo, false)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe plano com o nome informado e está inativo, o sócio deve estar associado a um plano ativo", 
          TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

        return null;
      }
    }

    socio = await this._repositorioSocio.obterSocioPorContato(input.contato);

    if(!Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Já existe sócio com o contato fornecido", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    await this._databaseManager.$transaction(async (tx) => {
      if(Validadores.ehValorInvalido(cliente) && !Validadores.ehValorInvalido(input.cliente))
        cliente = await this._repositorioCliente.adicionarCliente(tx,
        input.cliente!.documento, input.cliente!.nome, input.cliente!.email,
        input.cliente!.login, Hash.criptografarTexto(input.cliente!.senha)
      );

      if(Validadores.ehValorInvalido(plano) && !Validadores.ehValorInvalido(input.plano))
        plano = await this._repositorioPlano.adicionarPlano(tx, input.plano!.nome, input.plano!.descricao, 
          input.plano!.tipoRecorrencia, input.plano!.valorMensalidade, input.plano!.modalidade);

      endereco = await this._repositorioEndereco.adicionarEndereco(tx, input.endereco!.pais, input.endereco!.cidade,
        input.endereco!.cep, input.endereco!.bairro, input.endereco!.rua, input.endereco!.numero);

      socio = await this._repositorioSocio.adicionarSocio(tx, input.diaVencimentoPagamento, input.contato, 
        plano!.Id, cliente!.Id, endereco!.Id, input.apelido);      
    });

    return new AdicionarSocioResult(socio!.Apelido, socio!.DiaVencimentoPagamento, socio!.Id,
      new AdicionarClienteResult(cliente!.Nome, cliente!.Login),
      new AdicionarPlanoResult(plano!.Nome, plano!.Descricao, plano!.TipoRecorrencia, plano!.Modalidade, plano!.ValorMensalidade.toNumber(), plano!.Id),
      new AdicionarEnderecoResult(endereco!.Pais, endereco!.Cidade, endereco!.Cep), socio!.Contato
    );
  }

  atualizarSocio = async (input: AtualizarSocioInput, ticketRequisicao: string, idSocio: string): Promise<AtualizarSocioResult | null> => {
    let cliente : Cliente | null = null;
    
    const socio = await this._repositorioSocio.obterSocioComEnderecoECliente(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    const socioEncontrado = await this._repositorioSocio.obterSocioPorContato(input.contato);

    if(!Validadores.ehValorInvalido(socioEncontrado) && !Validadores.ehIgual(socioEncontrado!.Id, idSocio)){
      this._notificador.adicionarNotificacao(new Notificacao("Já existe sócio com o contato registrado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }
    
    const planoEncontrado = await this._repositorioPlano.obterPlanoPorNome(input.nomePlano);

    if(Validadores.ehValorInvalido(planoEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Plano não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    if(!Validadores.ehValorInvalido(planoEncontrado) && !Validadores.ehIgual(planoEncontrado!.Ativo, true)){
      this._notificador.adicionarNotificacao(new Notificacao("Plano especificado está inativo", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    cliente = await this._repositorioCliente.obterClientePorDocumento(input.cliente.documento);

    if(!Validadores.ehValorInvalido(cliente) && !Validadores.ehIgual(socio!.Cliente.Id, cliente!.Id)){
      this._notificador.adicionarNotificacao(new Notificacao("Documento especificado já é usado por outro cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    cliente = await this._repositorioCliente.obterClientePorEmail(input.cliente.email);

    if(!Validadores.ehValorInvalido(cliente) && !Validadores.ehIgual(socio!.Cliente.Id, cliente!.Id)){
      this._notificador.adicionarNotificacao(new Notificacao("Email especificado já é usado por outro cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    cliente = await this._repositorioCliente.obterClientePorLogin(input.cliente.login);

    if(!Validadores.ehValorInvalido(cliente) && !Validadores.ehIgual(socio!.Cliente.Id, cliente!.Id)){
      this._notificador.adicionarNotificacao(new Notificacao("Login especificado já é usado por outro cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let socioResultante: AtualizarSocioResult | null = null
    
    await this._databaseManager.$transaction(async (tx) => {
      const clienteAtualizado = await this._repositorioCliente.atualizarDadosCliente(tx, input.cliente.documento, input.cliente.nome, input.cliente.email, input.cliente.login, socio!.Cliente.Id);
      const enderecoAtualizado = await this._repositorioEndereco.atualizarDadosEndereco(tx, input.endereco.pais, input.endereco.cidade, input.endereco.cep, 
        input.endereco.bairro, input.endereco.rua, input.endereco.numero, socio!.Endereco.Id);
      const socioAtualizado = await this._repositorioSocio.atualizarDadosSocio(tx, input.diaVencimentoPagamento, input.contato, planoEncontrado!.Id, idSocio, input.apelido);

      socioResultante = new AtualizarSocioResult(socioAtualizado.Apelido, socioAtualizado.DiaVencimentoPagamento, 
        new AtualizarClienteResult(clienteAtualizado.Nome, clienteAtualizado.Login),
        new AtualizarPlanoResult(planoEncontrado!.Nome, planoEncontrado!.Descricao, planoEncontrado!.TipoRecorrencia, planoEncontrado!.Modalidade, planoEncontrado!.ValorMensalidade.toNumber(), planoEncontrado!.Id),
        new AtualizarEnderecoResult(enderecoAtualizado!.Pais, enderecoAtualizado!.Cidade, enderecoAtualizado!.Cep),
        socioAtualizado!.Id, socioAtualizado!.Contato
      );
    })
    
    return socioResultante;
  }

  alterarStatusAtivo = async (ticketRequisicao: string, idSocio: string, estaAtivo: boolean): Promise<SocioStatusResult | null> => {
    const socioEncontrado = await this._repositorioSocio.obterSocioComEnderecoECliente(idSocio);

    if(Validadores.ehValorInvalido(socioEncontrado)){
      this._notificador.adicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }
    
    if(Validadores.ehIgual(socioEncontrado!.Cliente.Ativo, estaAtivo)){
      this._notificador.adicionarNotificacao(new Notificacao(`Sócio já está ${this.obterStatus(estaAtivo)}`, TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let resposta: SocioStatusResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const clienteAtualizado = await this._repositorioCliente.alterarStatusAtivo(tx, estaAtivo, socioEncontrado!.Cliente.Id);
    
      resposta = new SocioStatusResult(idSocio, clienteAtualizado.Ativo);
    });
        
    return resposta;
  };

  obterTodosOsSocios = async () :Promise<ObterSocioResult[] | null> => {
    const socios = await this._repositorioSocio.obterTodosOsSociosComPlanoEnderecoECliente();

    if(Validadores.ehIgual(socios.length, 0)){
      return null;
    }

    const listaSocios = new Array<ObterSocioResult>();

    socios.forEach(socio => {
      const novoSocio = this.converterEntidadeEmDto(socio);

      listaSocios.push(novoSocio);
    });

    return listaSocios;
  }

  obterSocioPorId = async (idSocio: string, ticketRequisicao: string) : Promise<ObterSocioResult | null> => {
    const socio = await this._repositorioSocio.obterSocioComPlanoEnderecoEClientePeloId(idSocio);

    if(Validadores.ehValorInvalido(socio)){
      this._notificador.adicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    return this.converterEntidadeEmDto(socio!);
  }

  private obterStatus = (status: boolean) => status ? 'habilitado' : 'desabilitado';

  private converterEntidadeEmDto = (socio: Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; }) : ObterSocioResult => {
    return new ObterSocioResult(socio.Id, socio.DiaVencimentoPagamento,
      new ObterClienteResult(socio.Cliente.Id, socio.Cliente.Nome, socio.Cliente.Documento, socio.Cliente.Login, socio.Cliente.Email, socio.Cliente.Ativo, 
        socio.Cliente.DataCriacao, socio.Cliente.DataAtualizacao),
      new ObterPlanoResult(socio.Plano.Id, socio.Plano.Nome, socio.Plano.Descricao, socio.Plano.TipoRecorrencia, parseFloat(socio.Plano.ValorMensalidade.toString()), socio.Plano.Modalidade, 
        socio.Plano.Ativo, socio.Plano.DataCriacao, socio.Plano.DataAtualizacao),
      new ObterEnderecoResult(socio.Endereco.Id, socio.Endereco.Pais, socio.Endereco.Cidade, socio.Endereco.Cep, socio.Endereco.Bairro, socio.Endereco.Rua, 
        socio.Endereco.DataCriacao, socio.Endereco.Numero, socio.Endereco.DataAtualizacao),
      socio.DataCriacao, socio.Apelido, socio.DataAtualizacao, socio.Contato
      );
  }
}

export { ServicoSocio }