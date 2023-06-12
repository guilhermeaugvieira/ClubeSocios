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
  
  adicionarColaborador = async(input: AdicionarColaboradorInput, ticketRequisicao: string): Promise<AdicionarColaboradorResult | null> => {    
    let resposta: AdicionarColaboradorResult | null = null;

    let cliente: Cliente | null = null
    let colaborador: Colaborador | null = null;
    let papel: Papel | null = null;

    if(Validadores.textoComComprimentoEntre(input.idCliente, 36)){
      cliente = await this._repositorioCliente.obterClientePorId(input.idCliente!);

      if(Validadores.ehValorInvalido(cliente)){
        this._notificador.adicionarNotificacao(new Notificacao("Id do Cliente fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        return null;
      }

      if(Validadores.ehIgual(cliente!.Ativo, false)){
        this._notificador.adicionarNotificacao(new Notificacao("Cliente deve estar ativo para fazer associação", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }
  
    if(!Validadores.ehValorInvalido(input.cliente) && Validadores.ehValorInvalido(cliente)){
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

    if(Validadores.textoComComprimentoEntre(input.idPapel, 36)){
      papel = await this._repositorioPapel.obterPapelPorId(input.idPapel!);

      if(Validadores.ehValorInvalido(papel)){
        this._notificador.adicionarNotificacao(new Notificacao("Id do Papel fornecido não foi encontrado", TipoNotificacao.RecursoNaoEncontrado, this, ticketRequisicao));
        return null;
      }

      if(Validadores.ehIgual(papel!.Ativo, false)){
        this._notificador.adicionarNotificacao(new Notificacao("O papel informado pelo id se encontra inativo, o colaborador deve estar associado a um papel ativo", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    if(!Validadores.ehValorInvalido(input.papel) && Validadores.ehValorInvalido(papel)){
      papel = await this._repositorioPapel.obterPapelPorNome(input.papel!.nome);
      
      if(!Validadores.ehValorInvalido(papel) && Validadores.ehIgual(papel!.Ativo, false)){
        this._notificador.adicionarNotificacao(new Notificacao("Já existe papel com o nome informado e se encontra inativo, o colaborador deve estar associado a um papel ativo", 
        TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    if(!Validadores.ehValorInvalido(cliente) && !Validadores.ehValorInvalido(papel)){
      colaborador = await this._repositorioColaborador.obterColaboradorPorClienteEPapel(cliente!.Id, papel!.Id)
      
      if(!Validadores.ehValorInvalido(colaborador)){
        this._notificador.adicionarNotificacao(new Notificacao("Colaborador já está associado ao papel", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
        return null;
      }
    }

    await this._databaseManager.$transaction(async (tx) => {
      if(Validadores.ehValorInvalido(cliente) && !Validadores.ehValorInvalido(input.cliente))
        cliente = await this._repositorioCliente.adicionarCliente(tx,
        input.cliente!.documento, input.cliente!.nome, input.cliente!.email,
        input.cliente!.login, Hash.criptografarTexto(input.cliente!.senha)
      );

      if(Validadores.ehValorInvalido(papel) && !Validadores.ehValorInvalido(input.papel))
        papel = await this._repositorioPapel.adicionarPapel(tx, input.papel!.nome)

        colaborador = await this._repositorioColaborador.adicionarColaborador(tx, cliente!.Id, papel!.Id);
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

  loginColaborador = async(input: LoginColaboradorInput, ticketRequisicao: string): Promise<string | null> => {
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

    if(Validadores.ehValorInvalido(clienteLogado) || (!Validadores.ehValorInvalido(clienteLogado) && !Hash.ehOTextoCorreto(input.senha, clienteLogado!.Senha))){
      this._notificador.adicionarNotificacao(new Notificacao("Usuário ou senha incorreta", TipoNotificacao.DadoIncorreto, this, ticketRequisicao));
      return null;
    };

    if(!Validadores.ehValorInvalido(clienteLogado) && Validadores.ehIgual(clienteLogado!.Ativo, false)){
      this._notificador.adicionarNotificacao(new Notificacao("Usuário bloqueado", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
      return null;
    }
    
    const privilegios = await this._databaseManager.colaborador.findMany({
      where: {
        Cliente: {
          Id: clienteLogado!.Id,
        }
      }
    })

    if(!Validadores.ehNumeroMaiorQue(privilegios.length, 0)){
      this._notificador.adicionarNotificacao(new Notificacao("Seu usuário não possui privilégios", TipoNotificacao.RegraDeNegocio, this, ticketRequisicao));
      return null;
    }

    const tokenObject = {
      userId: clienteLogado!.Login,
      papeis: clienteLogado!.Colaboradores.map(p => p.Papel.Nome),
    }

    return Token.gerarJwt(tokenObject, clienteLogado!.Id, "Acesso Aplicação Colaborador", process.env.TOKEN_TEMPO_EXPIRACAO!);
  }
}

export { ServicoColaborador }