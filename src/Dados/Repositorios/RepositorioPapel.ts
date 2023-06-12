import { Papel, Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable, } from "tsyringe";
import { IRepositorioPapel } from "../Interfaces/IRepositorioPapel";
import { v4 as uuid } from 'uuid';

@injectable()
class RepositorioPapel implements IRepositorioPapel {

  private readonly _databaseManager: PrismaClient;

  constructor(
    @inject("Database") databaseManager: PrismaClient
  ){
    this._databaseManager = databaseManager;
  }

  obterPapelPorId = (idPapel: string) : Promise<Papel | null> => {
    return this._databaseManager.papel.findFirst({
      where: {
        Id: idPapel,
      }
    });
  }

  obterPapelPorNome = (nomePapel: string) : Promise<Papel | null> => {
    return this._databaseManager.papel.findFirst({
      where: {
        Nome: nomePapel.toUpperCase()
      }
    });
  }

  adicionarPapel = (
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nomePapel: string, idNovoPapel: string | undefined = uuid()) : Promise<Papel> => {
    return transactionContext.papel.create({
      data: {
        Ativo: true,
        Nome: nomePapel.toUpperCase(),
        Id: idNovoPapel,
        DataCriacao: new Date(),
        DataAtualizacao: null,
      }
    });
  }

  obterTodosOsPapeis = async () :Promise<Papel[]> => {
    return this._databaseManager.papel.findMany();
  }
}

export { RepositorioPapel }