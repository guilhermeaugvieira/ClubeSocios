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
  
  AdicionarSocio = async (input: AdicionarSocioInput, ticketRequisicao: string): Promise<AdicionarSocioResult | null> => {

    let plano: Plano | null = null;
    let socio: Socio | null = null;
    let cliente: Cliente | null = null;
    let endereco: Endereco | null = null;

    if(Validadores.TextoComComprimentoEntre(input.idCliente, 36)){
      cliente = await this._repositorioCliente.ObterClientePorId(input.idCliente!);

      if(Validadores.EhValorInvalido(cliente)){
        this._notificador.AdicionarNotificacao(new Notificacao("Id do cliente fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
        return null;
      }

      if(Validadores.EhIgual(cliente!.Ativo, false)){
        this._notificador.AdicionarNotificacao(new Notificacao("Cliente encontrado está inativo, para associação o cliente deve estar ativo", 
          TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        
        return null;
      }

      socio = await this._repositorioSocio.ObterSocioPorIdDoCliente(cliente!.Id);
      
      if(!Validadores.EhValorInvalido(socio)){
        this._notificador.AdicionarNotificacao(new Notificacao("Já existe socio associado ao cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    if(Validadores.EhValorInvalido(cliente) && !Validadores.EhValorInvalido(input.cliente)){
      cliente = await this._repositorioCliente.ObterClientePorDocumento(input.cliente!.documento);

      if(!Validadores.EhValorInvalido(cliente)){
        this._notificador.AdicionarNotificacao(new Notificacao("Já existe cliente com o documento fornecido", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }

      cliente = await this._repositorioCliente.ObterClientePorEmail(input.cliente!.email);

      if(!Validadores.EhValorInvalido(cliente)){
        this._notificador.AdicionarNotificacao(new Notificacao("Já existe cliente com o email cadastrado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }

      cliente = await this._repositorioCliente.ObterClientePorLogin(input.cliente!.login);

      if(!Validadores.EhValorInvalido(cliente)){
        this._notificador.AdicionarNotificacao(new Notificacao("Já existe cliente com o login cadastrado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    if(Validadores.TextoComComprimentoEntre(input.idPlano, 36)){
      plano = await this._repositorioPlano.ObterPlanoPorId(input.idPlano!);

      if(Validadores.EhValorInvalido(plano)){
        this._notificador.AdicionarNotificacao(new Notificacao("Id do plano fornecido não foi encontrado", 
          TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        
        return null;
      }

      if(Validadores.EhIgual(plano!.Ativo, false)){
        this._notificador.AdicionarNotificacao(new Notificacao("O sócio deve estar associado a um plano ativo", 
          TipoNotificacao.RegraDeNegocio, this, ticketRequisicao))
        
        return null;
      }
    }

    if(Validadores.EhValorInvalido(plano) && !Validadores.EhValorInvalido(input.plano)){
      plano = await this._repositorioPlano.ObterPlanoPorNome(input.plano!.nome);

      if(!Validadores.EhValorInvalido(plano) && Validadores.EhIgual(plano!.Ativo, false)){
        this._notificador.AdicionarNotificacao(new Notificacao("Já existe plano com o nome informado e está inativo, o sócio deve estar associado a um plano ativo", 
          TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

        return null;
      }
    }

    socio = await this._repositorioSocio.ObterSocioPorContato(input.contato);

    if(!Validadores.EhValorInvalido(socio)){
      this._notificador.AdicionarNotificacao(new Notificacao("Já existe sócio com o contato fornecido", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    await this._databaseManager.$transaction(async (tx) => {
      if(Validadores.EhValorInvalido(cliente) && !Validadores.EhValorInvalido(input.cliente))
        cliente = await this._repositorioCliente.AdicionarCliente(tx,
        input.cliente!.documento, input.cliente!.nome, input.cliente!.email,
        input.cliente!.login, Hash.CriptografarTexto(input.cliente!.senha)
      );

      if(Validadores.EhValorInvalido(plano) && !Validadores.EhValorInvalido(input.plano))
        plano = await this._repositorioPlano.AdicionarPlano(tx, input.plano!.nome, input.plano!.descricao, 
          input.plano!.tipoRecorrencia, input.plano!.valorMensalidade, input.plano!.modalidade);

      endereco = await this._repositorioEndereco.AdicionarEndereco(tx, input.endereco!.pais, input.endereco!.cidade,
        input.endereco!.cep, input.endereco!.bairro, input.endereco!.rua, input.endereco!.numero);

      socio = await this._repositorioSocio.AdicionarSocio(tx, input.diaVencimentoPagamento, input.contato, 
        plano!.Id, cliente!.Id, endereco!.Id, input.apelido);      
    });

    return new AdicionarSocioResult(socio!.Apelido, socio!.DiaVencimentoPagamento, socio!.Id,
      new AdicionarClienteResult(cliente!.Nome, cliente!.Login),
      new AdicionarPlanoResult(plano!.Nome, plano!.Descricao, plano!.TipoRecorrencia, plano!.Modalidade, plano!.Id),
      new AdicionarEnderecoResult(endereco!.Pais, endereco!.Cidade, endereco!.Cep), socio!.Contato
    );
  }

  AtualizarSocio = async (input: AtualizarSocioInput, ticketRequisicao: string, idSocio: string): Promise<AtualizarSocioResult | null> => {
    let cliente : Cliente | null = null;
    
    const socio = await this._repositorioSocio.ObterSocioComEnderecoECliente(idSocio);

    if(Validadores.EhValorInvalido(socio)){
      this._notificador.AdicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    const socioEncontrado = await this._repositorioSocio.ObterSocioPorContato(input.contato);

    if(!Validadores.EhValorInvalido(socioEncontrado) && !Validadores.EhIgual(socioEncontrado!.Id, idSocio)){
      this._notificador.AdicionarNotificacao(new Notificacao("Já existe sócio com o contato registrado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }
    
    const planoEncontrado = await this._repositorioPlano.ObterPlanoPorNome(input.nomePlano);

    if(Validadores.EhValorInvalido(planoEncontrado)){
      this._notificador.AdicionarNotificacao(new Notificacao("Plano não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    if(!Validadores.EhValorInvalido(planoEncontrado) && !Validadores.EhIgual(planoEncontrado!.Ativo, true)){
      this._notificador.AdicionarNotificacao(new Notificacao("Plano especificado está inativo", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    cliente = await this._repositorioCliente.ObterClientePorDocumento(input.cliente.documento);

    if(!Validadores.EhValorInvalido(cliente) && !Validadores.EhIgual(socio!.Cliente.Id, cliente!.Id)){
      this._notificador.AdicionarNotificacao(new Notificacao("Documento especificado já é usado por outro cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    cliente = await this._repositorioCliente.ObterClientePorEmail(input.cliente.email);

    if(!Validadores.EhValorInvalido(cliente) && !Validadores.EhIgual(socio!.Cliente.Id, cliente!.Id)){
      this._notificador.AdicionarNotificacao(new Notificacao("Email especificado já é usado por outro cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    cliente = await this._repositorioCliente.ObterClientePorLogin(input.cliente.login);

    if(!Validadores.EhValorInvalido(cliente) && !Validadores.EhIgual(socio!.Cliente.Id, cliente!.Id)){
      this._notificador.AdicionarNotificacao(new Notificacao("Login especificado já é usado por outro cliente", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let socioResultante: AtualizarSocioResult | null = null
    
    await this._databaseManager.$transaction(async (tx) => {
      const clienteAtualizado = await this._repositorioCliente.AtualizarDadosCliente(tx, input.cliente.documento, input.cliente.nome, input.cliente.email, input.cliente.login, socio!.Cliente.Id);
      const enderecoAtualizado = await this._repositorioEndereco.AtualizarDadosEndereco(tx, input.endereco.pais, input.endereco.cidade, input.endereco.cep, 
        input.endereco.bairro, input.endereco.rua, input.endereco.numero, socio!.Endereco.Id);
      const socioAtualizado = await this._repositorioSocio.AtualizarDadosSocio(tx, input.diaVencimentoPagamento, input.contato, planoEncontrado!.Id, idSocio, input.apelido);

      socioResultante = new AtualizarSocioResult(socioAtualizado.Apelido, socioAtualizado.DiaVencimentoPagamento, 
        new AtualizarClienteResult(clienteAtualizado.Nome, clienteAtualizado.Login),
        new AtualizarPlanoResult(planoEncontrado!.Nome, planoEncontrado!.Descricao, planoEncontrado!.TipoRecorrencia, planoEncontrado!.Modalidade),
        new AtualizarEnderecoResult(enderecoAtualizado!.Pais, enderecoAtualizado!.Cidade, enderecoAtualizado!.Cep),
        socioAtualizado!.Id, socioAtualizado!.Contato
      );
    })
    
    return socioResultante;
  }

  AlterarStatusAtivo = async (ticketRequisicao: string, idSocio: string, estaAtivo: boolean): Promise<SocioStatusResult | null> => {
    const socioEncontrado = await this._repositorioSocio.ObterSocioComEnderecoECliente(idSocio);

    if(Validadores.EhValorInvalido(socioEncontrado)){
      this._notificador.AdicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }
    
    if(Validadores.EhIgual(socioEncontrado!.Cliente.Ativo, estaAtivo)){
      this._notificador.AdicionarNotificacao(new Notificacao(`Sócio já está ${this.ObterStatus(estaAtivo)}`, TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));

      return null;
    }

    let resposta: SocioStatusResult | null = null;
    
    await this._databaseManager.$transaction(async (tx) => {
      const clienteAtualizado = await this._repositorioCliente.AlterarStatusAtivo(tx, estaAtivo, socioEncontrado!.Cliente.Id);
    
      resposta = new SocioStatusResult(idSocio, clienteAtualizado.Ativo);
    });
        
    return resposta;
  };

  ObterTodosOsSocios = async () :Promise<ObterSocioResult[] | null> => {
    const socios = await this._repositorioSocio.ObterTodosOsSociosComPlanoEnderecoECliente();

    if(Validadores.EhIgual(socios.length, 0)){
      return null;
    }

    const listaSocios = new Array<ObterSocioResult>();

    socios.forEach(socio => {
      const novoSocio = this.ConverterEntidadeEmDto(socio);

      listaSocios.push(novoSocio);
    });

    return listaSocios;
  }

  ObterSocioPorId = async (idSocio: string, ticketRequisicao: string) : Promise<ObterSocioResult | null> => {
    const socio = await this._repositorioSocio.ObterSocioComPlanoEnderecoEClientePeloId(idSocio);

    if(Validadores.EhValorInvalido(socio)){
      this._notificador.AdicionarNotificacao(new Notificacao("Sócio não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));

      return null;
    }

    return this.ConverterEntidadeEmDto(socio!);
  }

  private ObterStatus = (status: boolean) => status ? 'habilitado' : 'desabilitado';

  private ConverterEntidadeEmDto = (socio: Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; }) : ObterSocioResult => {
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