import { Cliente, Dependente, Endereco, Plano, Prisma, PrismaClient, Socio, VeiculoSocio } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IRepositorioSocio } from "../Interfaces/IRepositorioSocio";
import { v4 as uuid } from "uuid";

@injectable()
class RepositorioSocio implements IRepositorioSocio{

  private readonly _databaseManager: PrismaClient;

  constructor(
    @inject("Database") databaseManager: PrismaClient
  ){
    this._databaseManager = databaseManager;
  }

  obterSocioComEnderecoEClientePorId = async(idSocio: string) : Promise <(Socio & { Endereco: Endereco, Cliente: Cliente }) | null> => {
    return this._databaseManager.socio.findFirst({
      include: {
        Endereco: true,
        Cliente: true,
      },
      where: {
        Id: idSocio,
      }
    })
  }

  obterSocioPorId = async(idSocio: string) : Promise<Socio | null> => {
    return this._databaseManager.socio.findFirst({
      where: {
        Id: idSocio,
      }
    });
  }
  
  obterSocioPorIdDoCliente = async (idCliente: string) : Promise<Socio | null> => {
    return this._databaseManager.socio.findFirst({
      where: {
        Cliente: {
          Id: idCliente,
        }
      }
    });
  }

  obterSocioPorContato = ( contatoSocio: string ) : Promise<Socio | null> => {
    return this._databaseManager.socio.findFirst({
      where: {
        Contato: contatoSocio
      }
    });
  }

  adicionarSocio = (
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    diaVencimentoPagamento: number, contato: string, idPlano: string, idCliente: string, idEndereco: string, apelido?: string | null, idNovoSocio: string | undefined = uuid()) :Promise<Socio> => {
    return transactionContext.socio.create({
      data: {
        DiaVencimentoPagamento: diaVencimentoPagamento,
        Contato: contato,
        Apelido: apelido,
        DataCriacao: new Date(),
        DataAtualizacao: null,
        Id: idNovoSocio,
        Endereco: {
          connect: {
            Id: idEndereco,
          }
        },
        Plano: {
          connect: {
            Id: idPlano,
          }
        },
        Cliente: {
          connect: {
            Id: idCliente,
          }
        }
      }
    });
  }

  atualizarDadosSocio = (
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    diaVencimentoPagamento: number, contato: string, idPlano: string, idSocio: string, apelido?: string | null) :Promise<Socio> => {
    return transactionContext.socio.update({
      data: {
        DiaVencimentoPagamento: diaVencimentoPagamento,
        Contato: contato,
        Apelido: apelido,
        DataAtualizacao: new Date(),
        FkPlano: idPlano,
      },
      where: {
        Id: idSocio,
      }
    });
  };

  obterTodosOsSociosComPlanoEnderecoClienteVeiculosEDependentesComCliente = async () :Promise<(Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; Veiculos: VeiculoSocio[]; Dependentes: (Dependente & { Cliente: Cliente})[]})[]> => {
    return this._databaseManager.socio.findMany({
      include: {
        Cliente: true,
        Endereco: true,
        Plano: true,
        Dependentes: {
          include: {
            Cliente: true,
          }
        },
        Veiculos: true,
      }
    });
  }

  obterSocioComPlanoEnderecoClienteVeiculosEDependentesComClientePeloId = async (idSocio: string) :Promise<(Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; Veiculos: VeiculoSocio[]; Dependentes: (Dependente & { Cliente: Cliente})[]}) | null> => {
    return this._databaseManager.socio.findFirst({
      include: {
        Cliente: true,
        Endereco: true,
        Plano: true,
        Dependentes: {
          include: {
            Cliente: true,
          }
        },
        Veiculos: true,
      },
      where: {
        Id: idSocio
      }
    });
  }
}

export { RepositorioSocio }