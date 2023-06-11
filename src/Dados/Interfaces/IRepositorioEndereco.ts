import { Endereco, Prisma, PrismaClient } from "@prisma/client"

interface IRepositorioEndereco {
  AdicionarEndereco(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    pais: string, cidade: string, cep: string, bairro: string, rua: string, numero: number | null | undefined, idNovoEndereco?: string): Promise<Endereco>
  AtualizarDadosEndereco(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    pais: string, cidade: string, cep: string, bairro: string, rua: string, numero: number | null| undefined, idEndereco: string): Promise<Endereco>
}

export { IRepositorioEndereco }