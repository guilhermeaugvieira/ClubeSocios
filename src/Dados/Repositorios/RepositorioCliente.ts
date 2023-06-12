import { Cliente, Prisma, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { IRepositorioCliente } from "../Interfaces/IRepositorioCliente";
import { v4 as uuid } from 'uuid';

@injectable()
class RepositorioCliente implements IRepositorioCliente {

  private readonly _databaseManager: PrismaClient;

  constructor(
    @inject("Database") databaseManager: PrismaClient
  ){
    this._databaseManager = databaseManager;
  }

  obterClientePorId = (idCliente: string) : Promise<Cliente | null> => {
    return this._databaseManager.cliente.findFirst({
      where: {
        Id: idCliente
      },
    })
  }

  obterClientePorDocumento = (documentoCliente: string) : Promise<Cliente | null> => {
    return this._databaseManager.cliente.findFirst({
      where: {
        Documento: documentoCliente.toUpperCase()
      },
    })
  }

  obterClientePorLogin = (loginCliente: string): Promise <Cliente | null> => {
    return this._databaseManager.cliente.findFirst({
      where: {
        Login: loginCliente.toUpperCase()
      },
    })
  };

  obterClientePorEmail = (emailCliente: string): Promise <Cliente | null> => {
    return this._databaseManager.cliente.findFirst({
      where: {
        Email: emailCliente.toLowerCase()
      },
    })
  }

  adicionarCliente = async (
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    documento: string, nome: string, email: string, 
    login: string, senha: string, idNovoCliente: string | undefined = uuid()) : Promise<Cliente> => 
  {
    return transactionContext.cliente.create({
      data: {
        Documento: documento.toUpperCase(),
        Ativo: true,
        Nome: nome.toUpperCase(),
        Email: email.toLowerCase(),
        Login: login.toUpperCase(),
        Senha: senha,
        DataCriacao: new Date(),
        DataAtualizacao: null,
        Id: idNovoCliente,
      }
    });
  }

  atualizarDadosCliente = async (
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    documento: string, nome: string, email: string, login: string, idCliente: string) : Promise<Cliente> => 
  {
    return transactionContext.cliente.update({
      data: {
        Documento: documento.toUpperCase(),
        Ativo: true,
        Nome: nome.toUpperCase(),
        Email: email.toLowerCase(),
        Login: login.toUpperCase(),
        DataAtualizacao: new Date(),
      },
      where: {
        Id: idCliente,
      }
    });
  }

  alterarStatusAtivo = async (
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    estaAtivo: boolean, idCliente: string) : Promise<Cliente> => 
  {
    return transactionContext.cliente.update({
      data: {
        Ativo: estaAtivo,
        DataAtualizacao: new Date(),
      },
      where: {
        Id: idCliente,
      }
    });
  }

}

export { RepositorioCliente }