import { inject, injectable} from "tsyringe";
import { IServicoColaborador } from "../Interfaces/IServicoColaborador";
import { AdicionarColaboradorResult } from "../../Modelos/Results/ColaboradorResult";
import { AdicionarColaboradorInput, LoginColaboradorInput } from "../../Modelos/Inputs/ColaboradorInput";
import { INotificador } from "../../../Core/INotificador";
import { Notificacao, TipoNotificacao } from "../../../Core/Notificacao";
import { Cliente, Colaborador, Papel, PrismaClient } from '@prisma/client';
import { AdicionarClienteResult } from "../../Modelos/Results/ClienteResult";
import { AdicionarPapelResult } from "../../Modelos/Results/PapelResult";
import { Validadores } from "../../../Core/Validadores";
import { IRepositorioCliente } from "../../../Dados/Interfaces/IRepositorioCliente";
import { IRepositorioPapel } from "../../../Dados/Interfaces/IRepositorioPapel";
import { IRepositorioColaborador } from "../../../Dados/Interfaces/IRepositorioColaborador";
import { Hash } from "../../../Infra/Hash";
import { Token } from "../../../Infra/Token";

@injectable()
class ServicoColaborador implements IServicoColaborador {
  
  private readonly _notificador: INotificador;
  private readonly _databaseManager: PrismaClient;
  private readonly _repositorioCliente: IRepositorioCliente;
  private readonly _repositorioPapel: IRepositorioPapel;
  private readonly _repositorioColaborador: IRepositorioColaborador;

  constructor(
    @inject("Notificador") notificador: INotificador,
    @inject("Database") databaseManager: PrismaClient,
    @inject("RepositorioCliente") repositorioCliente: IRepositorioCliente,
    @inject("RepositorioPapel") repositorioPapel: IRepositorioPapel,
    @inject("RepositorioColaborador") repositorioColaborador: IRepositorioColaborador,
  ){
    this._notificador = notificador;
    this._databaseManager = databaseManager;
    this._repositorioCliente = repositorioCliente;
    this._repositorioPapel = repositorioPapel;
    this._repositorioColaborador = repositorioColaborador;
  }
  
  AdicionarColaborador = async(input: AdicionarColaboradorInput, ticketRequisicao: string): Promise<AdicionarColaboradorResult | null> => {    
    let resposta: AdicionarColaboradorResult | null = null;

    let cliente: Cliente | null = null
    let colaborador: Colaborador | null = null;
    let papel: Papel | null = null;

    if(Validadores.TextoComComprimentoEntre(input.idCliente, 36)){
      cliente = await this._repositorioCliente.ObterClientePorId(input.idCliente!);

      if(Validadores.EhValorInvalido(cliente)){
        this._notificador.AdicionarNotificacao(new Notificacao("Id do Cliente fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        return null;
      }

      if(Validadores.EhIgual(cliente!.Ativo, false)){
        this._notificador.AdicionarNotificacao(new Notificacao("Cliente deve estar ativo para fazer associação", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }
  
    if(!Validadores.EhValorInvalido(input.cliente) && Validadores.EhValorInvalido(cliente)){
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

    if(Validadores.TextoComComprimentoEntre(input.idPapel, 36)){
      papel = await this._repositorioPapel.ObterPapelPorId(input.idPapel!);

      if(Validadores.EhValorInvalido(papel)){
        this._notificador.AdicionarNotificacao(new Notificacao("Id do Papel fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        return null;
      }

      if(Validadores.EhIgual(papel!.Ativo, false)){
        this._notificador.AdicionarNotificacao(new Notificacao("O papel informado pelo id se encontra inativo, o colaborador deve estar associado a um papel ativo", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    if(!Validadores.EhValorInvalido(input.papel) && Validadores.EhValorInvalido(papel)){
      papel = await this._repositorioPapel.ObterPapelPorNome(input.papel!.nome);
      
      if(!Validadores.EhValorInvalido(papel) && Validadores.EhIgual(papel!.Ativo, false)){
        this._notificador.AdicionarNotificacao(new Notificacao("Já existe papel com o nome informado e se encontra inativo, o colaborador deve estar associado a um papel ativo", 
        TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    if(!Validadores.EhValorInvalido(cliente) && !Validadores.EhValorInvalido(papel)){
      colaborador = await this._repositorioColaborador.ObterColaboradorPorClienteEPapel(cliente!.Id, papel!.Id)
      
      if(!Validadores.EhValorInvalido(colaborador)){
        this._notificador.AdicionarNotificacao(new Notificacao("Colaborador já está associado ao papel", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    await this._databaseManager.$transaction(async (tx) => {
      if(Validadores.EhValorInvalido(cliente) && !Validadores.EhValorInvalido(input.cliente))
        cliente = await this._repositorioCliente.AdicionarCliente(tx,
        input.cliente!.documento, input.cliente!.nome, input.cliente!.email,
        input.cliente!.login, Hash.CriptografarTexto(input.cliente!.senha)
      );

      if(Validadores.EhValorInvalido(papel) && !Validadores.EhValorInvalido(input.papel))
        papel = await this._repositorioPapel.AdicionarPapel(tx, input.papel!.nome)

        colaborador = await this._repositorioColaborador.AdicionarColaborador(tx, cliente!.Id, papel!.Id);
    });

    resposta = new AdicionarColaboradorResult(
      new AdicionarClienteResult(
        cliente!.Nome,
        cliente!.Login,
      ),
      new AdicionarPapelResult(
        papel!.Nome,
        papel!.Id,
      )
    );

    return resposta;    
  }

  LoginColaborador = async(input: LoginColaboradorInput, ticketRequisicao: string): Promise<string | null> => {
    const clienteLogado = await this._databaseManager.cliente.findFirst({
      where: {
        Login: input.login.toUpperCase(),
      },
      include: {
        Colaboradores: {
          include: {
            Papel: true,
          }
        }
      }
    });

    if(Validadores.EhValorInvalido(clienteLogado) || (!Validadores.EhValorInvalido(clienteLogado) && !Hash.EhOTextoCorreto(input.senha, clienteLogado!.Senha))){
      this._notificador.AdicionarNotificacao(new Notificacao("Usuário ou senha incorreta", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
      return null;
    };

    if(!Validadores.EhValorInvalido(clienteLogado) && Validadores.EhIgual(clienteLogado!.Ativo, false)){
      this._notificador.AdicionarNotificacao(new Notificacao("Usuário bloqueado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
      return null;
    }
    
    const privilegios = await this._databaseManager.colaborador.findMany({
      where: {
        Cliente: {
          Id: clienteLogado!.Id,
        }
      }
    })

    if(!Validadores.EhNumeroMaiorQue(privilegios.length, 0)){
      this._notificador.AdicionarNotificacao(new Notificacao("Seu usuário não possui privilégios", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
      return null;
    }

    const tokenObject = {
      userId: clienteLogado!.Login,
      papeis: clienteLogado!.Colaboradores.map(p => p.Papel.Nome),
    }

    return Token.GerarJwt(tokenObject, clienteLogado!.Id, "Acesso Aplicação Colaborador", process.env.TOKEN_TEMPO_EXPIRACAO!);
  }
}

export { ServicoColaborador }