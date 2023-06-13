import { Plano, Prisma, PrismaClient, Socio } from "@prisma/client";
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

  obterPlanoComSocios = (idPlano: string): Promise<(Plano & { Socios: Socio[]; } | null) | null> => {
    return this._databaseManager.plano.findFirst({
      where: {
        Id: idPlano
      },
      include: {
        Socios: true,
      }
    });
  };

  obterPlanoPorId = (idPlano: string) : Promise<Plano | null> => {
    return this._databaseManager.plano.findFirst({
      where: {
        Id: idPlano
      }
    });
  };

  obterPlanoPorNome = (nomePlano: string) : Promise<Plano | null> => {
    return this._databaseManager.plano.findFirst({
      where: {
        Nome: nomePlano.toUpperCase()
      }
    })
  };

  adicionarPlano = (transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string, idNovoPlano: string | undefined = uuid()): Promise<Plano> => {
    return transactionContext.plano.create({
      data: {
        Ativo: true,
        Nome: nome.toUpperCase(),
        Descricao: descricao,
        TipoRecorrencia: tipoRecorrencia.toUpperCase(),
        ValorMensalidade: new Prisma.Decimal(valorMensalidade),
        Modalidade: modalidade.toUpperCase(),
        DataAtualizacao: null,
        DataCriacao: new Date(),
        Id: idNovoPlano,
      }
    });
  }

  atualizarDadosPlano = (transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string, idPlano: string): Promise<Plano> => {
    return transactionContext.plano.update({
      data: {
        Nome: nome.toUpperCase(),
        Descricao: descricao,
        TipoRecorrencia: tipoRecorrencia.toUpperCase(),
        ValorMensalidade: new Prisma.Decimal(valorMensalidade),
        Modalidade: modalidade.toUpperCase(),
        DataAtualizacao: new Date(),
      },
      where: {
        Id: idPlano,
      }
    });
  }

  atualizarStatusAtivoDoPlano = (transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    status: boolean, idPlano: string): Promise<Plano> => {
    return transactionContext.plano.update({
      data: {
        Ativo: status,
        DataAtualizacao: new Date(),
      },
      where: {
        Id: idPlano,
      }
    });
  }

  obterTodosOsPlanos = async () : Promise<Plano[]> => {
    return this._databaseManager.plano.findMany();
  }
}

export { RepositorioPlano }