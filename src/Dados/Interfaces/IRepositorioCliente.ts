import { Cliente, Prisma, PrismaClient } from "@prisma/client";

interface IRepositorioCliente {
  ObterClientePorId(idCliente: string) : Promise<Cliente | null>;
  ObterClientePorDocumento(documentoCliente: string) : Promise<Cliente | null>;
  ObterClientePorLogin(loginCliente: string): Promise <Cliente | null>;
  ObterClientePorEmail(emailCliente: string): Promise <Cliente | null>;  
  AdicionarCliente(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    documento: string, nome: string, email: string, login: string, senha: string, idNovoCliente?: string) : Promise<Cliente>
  AtualizarDadosCliente(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    documento: string, nome: string, email: string, login: string, idCliente: string) : Promise<Cliente>;
  AlterarStatusAtivo(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    estaAtivo: boolean, idCliente: string) : Promise<Cliente>;
}

export { IRepositorioCliente }