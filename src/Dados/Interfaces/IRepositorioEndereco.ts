import { Endereco, Prisma, PrismaClient } from "@prisma/client"

interface IRepositorioEndereco {
  adicionarEndereco(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    pais: string, cidade: string, cep: string, bairro: string, rua: string, numero: number | null | undefined, idNovoEndereco?: string): Promise<Endereco>
  atualizarDadosEndereco(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    pais: string, cidade: string, cep: string, bairro: string, rua: string, numero: number | null| undefined, idEndereco: string): Promise<Endereco>
}

export { IRepositorioEndereco }