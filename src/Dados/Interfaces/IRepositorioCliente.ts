import { Cliente, Prisma, PrismaClient } from "@prisma/client";

interface IRepositorioCliente {
  obterClientePorId(idCliente: string) : Promise<Cliente | null>;
  obterClientePorDocumento(documentoCliente: string) : Promise<Cliente | null>;
  obterClientePorLogin(loginCliente: string): Promise <Cliente | null>;
  obterClientePorEmail(emailCliente: string): Promise <Cliente | null>;  
  adicionarCliente(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    documento: string, nome: string, email: string, login: string, senha: string, idNovoCliente?: string) : Promise<Cliente>
  atualizarDadosCliente(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    documento: string, nome: string, email: string, login: string, idCliente: string) : Promise<Cliente>;
  alterarStatusAtivo(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    estaAtivo: boolean, idCliente: string) : Promise<Cliente>;
}

export { IRepositorioCliente }