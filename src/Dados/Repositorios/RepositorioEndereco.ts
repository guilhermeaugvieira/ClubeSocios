import { Endereco, Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IRepositorioEndereco } from "../Interfaces/IRepositorioEndereco";
import { v4 as uuid } from "uuid";

@injectable()
class RepositorioEndereco implements IRepositorioEndereco {

  private readonly _databaseManager: PrismaClient;

  constructor(
    @inject("Database") databaseManager: PrismaClient
  ){
    this._databaseManager = databaseManager;
  }

  adicionarEndereco = (transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    pais: string, cidade: string, cep: string, bairro: string, rua: string, numero: number | null| undefined, idNovoEndereco: string | undefined = uuid()): Promise<Endereco> => {
    return transactionContext.endereco.create({
      data: {
        Pais: pais.toUpperCase(),
        Cidade: cidade.toUpperCase(),
        Cep: cep.toUpperCase(),
        Bairro: bairro.toUpperCase(),
        Rua: rua.toUpperCase(),
        Numero: numero,
        DataAtualizacao: null,
        DataCriacao: new Date(),
        Id: idNovoEndereco
      }
    })
  }

  atualizarDadosEndereco = (transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    pais: string, cidade: string, cep: string, bairro: string, rua: string, numero: number | null| undefined, idEndereco: string): Promise<Endereco> => {
    return transactionContext.endereco.update({
      data: {
        Pais: pais.toUpperCase(),
        Cidade: cidade.toUpperCase(),
        Cep: cep.toUpperCase(),
        Bairro: bairro.toUpperCase(),
        Rua: rua.toUpperCase(),
        Numero: numero,
        DataAtualizacao: new Date(),
      },
      where: {
        Id: idEndereco
      }
    })
  }
}

export { RepositorioEndereco }