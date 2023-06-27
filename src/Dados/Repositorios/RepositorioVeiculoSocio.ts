import { Cliente, Dependente, Endereco, Plano, Prisma, PrismaClient, Socio, VeiculoSocio } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IRepositorioVeiculoSocio } from "../Interfaces/IRepositorioVeiculoSocio";
import { v4 as uuid } from 'uuid';

@injectable()
class RepositorioVeiculoSocio implements IRepositorioVeiculoSocio{

  private readonly _databaseManager: PrismaClient;

  constructor(
    @inject("Database") databaseManager: PrismaClient
  ){
    this._databaseManager = databaseManager;
  }

  obterVeiculoSocioPelaPlaca = async(placa: string) : Promise<VeiculoSocio | null> => {
    return this._databaseManager.veiculoSocio.findFirst({
      where: {
        Placa: placa.toUpperCase()
      }
    });
  }

  obterVeiculoSocioPorId = async(idVeiculo: string) : Promise<VeiculoSocio | null> => {
    return this._databaseManager.veiculoSocio.findFirst({
      where: {
        Id: idVeiculo,
      }
    });
  }


  obterVeiculosPeloIdSocio = async(idSocio: string) : Promise<VeiculoSocio[]> => {
    return this._databaseManager.veiculoSocio.findMany({
      where: {
        Socio: {
          Id: idSocio
        }
      }
    });
  }

  adicionarVeiculoSocio = async(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    placa: string, idSocio: string, idNovoVeiculo: string | undefined = uuid()
  ): Promise<VeiculoSocio> => {
    return transactionContext.veiculoSocio.create({
      data: {
        Ativo: true,
        Placa: placa.toUpperCase(),
        FkSocio: idSocio,
        Id: idNovoVeiculo,
        DataCriacao: new Date(),
        DataAtualizacao: null,
      },
    })
  }

  atualizarVeiculoSocio = async(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    placa: string, idVeiculo: string
  ): Promise<VeiculoSocio> => {
    return transactionContext.veiculoSocio.update({
      data: {
        Placa: placa.toUpperCase(),
        Id: idVeiculo,
        DataAtualizacao: new Date(),
      },
      where: {
        Id: idVeiculo
      }
    });
  }

  atualizarStatusAtivoVeiculoSocio = async(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    estaAtivo: boolean, idVeiculo: string
  ): Promise<VeiculoSocio> => {
    return transactionContext.veiculoSocio.update({
      data: {
        Id: idVeiculo,
        DataAtualizacao: new Date(),
        Ativo: estaAtivo,
      },
      where: {
        Id: idVeiculo
      }
    });
  }

}

export { RepositorioVeiculoSocio }