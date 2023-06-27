import { Cliente, Dependente, Endereco, Plano, Prisma, PrismaClient, Socio, VeiculoSocio } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IRepositorioDependente } from "../Interfaces/IRepositorioDependente";
import { v4 as uuid } from 'uuid'; 

@injectable()
class RepositorioDependente implements IRepositorioDependente {

  private readonly _databaseManager: PrismaClient;

  constructor(
    @inject("Database") databaseManager: PrismaClient
  ){
    this._databaseManager = databaseManager;
  }

  obterDependentePorIdDoCliente = async (idCliente: string): Promise<Dependente | null> => {
    return this._databaseManager.dependente.findFirst({
      where: {
        Cliente: {
          Id: idCliente
        }
      }
    });
  }

  obterDependenteComClienteEDadosDoSocioPorIdDoDependente = async (idDependente: string): 
  Promise<(Dependente & { Cliente: Cliente, Socio: Socio & { Cliente: Cliente, Plano: Plano, Endereco: Endereco, Veiculos: VeiculoSocio[] } }) | null> => {
    return this._databaseManager.dependente.findFirst({
      include: {
        Cliente: true,
        Socio: {
          include: {
            Cliente: true,
            Plano: true,
            Endereco: true,
            Veiculos: true,
          }
        },
      },
      where: {
        Id: idDependente,
      }
    });
  }

  adicionarDependente = async (
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    idCliente: string, idSocio: string, idNovoDependente: string | undefined = uuid()
  ) : Promise<Dependente> => {
    return transactionContext.dependente.create({
      data: {
        FkCliente: idCliente,
        FkSocio: idSocio,
        DataAtualizacao: null,
        DataCriacao: new Date(),
        Id: idNovoDependente,
      }
    });
  }

  atualizarDependente = async (
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    idDependente: string | undefined = uuid()
  ) : Promise<Dependente> => {
    return transactionContext.dependente.update({
      data: {
        DataAtualizacao: new Date(),
      },
      where: {
        Id: idDependente
      }
    });
  }
}

export { RepositorioDependente }