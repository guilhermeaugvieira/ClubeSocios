import { Plano, Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IRepositorioPlano } from "../Interfaces/IRepositorioPlano";
import { v4 as uuid } from "uuid";

@injectable()
class RepositorioPlano implements IRepositorioPlano {

  private readonly _databaseManager : PrismaClient;

  constructor(
    @inject("Database") databaseManager: PrismaClient
  ){
    this._databaseManager = databaseManager;
  }

  ObterPlanoPorId = (idPlano: string) : Promise<Plano | null> => {
    return this._databaseManager.plano.findFirst({
      where: {
        Id: idPlano
      }
    });
  };

  ObterPlanoPorNome = (nomePlano: string) : Promise<Plano | null> => {
    return this._databaseManager.plano.findFirst({
      where: {
        Nome: nomePlano.toUpperCase()
      }
    })
  };

  AdicionarPlano = (transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string, idNovoPlano: string | undefined = uuid()): Promise<Plano> => {
    return transactionContext.plano.create({
      data: {
        Ativo: true,
        Nome: nome.toUpperCase(),
        Descricao: descricao,
        TipoRecorrencia: tipoRecorrencia.toUpperCase(),
        ValorMensalidade: valorMensalidade,
        Modalidade: modalidade.toUpperCase(),
        DataAtualizacao: null,
        DataCriacao: new Date(),
        Id: idNovoPlano,
      }
    });
  }

  ObterTodosOsPlanos = async () : Promise<Plano[]> => {
    return this._databaseManager.plano.findMany();
  }
}

export { RepositorioPlano }