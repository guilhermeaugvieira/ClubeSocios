import { Colaborador, Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable} from "tsyringe";
import { IRepositorioColaborador } from "../Interfaces/IRepositorioColaborador";
import { v4 as uuid } from "uuid";

@injectable()
class RepositorioColaborador implements IRepositorioColaborador {

  private readonly _databaseManager: PrismaClient;

  constructor(
    @inject("Database") databaseManager: PrismaClient
  ){
    this._databaseManager = databaseManager;
  }

  obterColaboradorPorClienteEPapel = (idCliente: string, idPapel: string) : Promise < Colaborador | null > => {
    return this._databaseManager.colaborador.findFirst({
      where: {
        AND: {
          FkCliente: idCliente,
          FkPapel: idPapel
        }
      }
    });
  }

  adicionarColaborador = async(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    idCliente: string, idPapel: string, idNovoColaborador: string | undefined = uuid()) : Promise<Colaborador> => {
    return transactionContext.colaborador.create({
      data: {
        Id: idNovoColaborador,
        Cliente: {
          connect: {
            Id: idCliente,
          }
        },
        Papel: {
          connect: {
            Id: idPapel,
          }
        },
        DataCriacao: new Date(),
        DataAtualizacao: null,
      }
    });
  }
}

export { RepositorioColaborador }