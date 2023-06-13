import { Colaborador, Papel, Prisma, PrismaClient } from "@prisma/client";

interface IRepositorioPapel {
  obterPapelPorId(idPapel: string) : Promise<Papel | null>;
  obterPapelPorNome(nomePapel: string) : Promise<Papel | null>;
  obterTodosOsPapeis() :Promise<Papel[]>;
  adicionarPapel(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nomePapel: string, idNovoPapel?: string) : Promise<Papel>;
  atualizarDadosPapel(
      transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
      nomePapel: string, idPapel: string) : Promise<Papel>;
  obterPapelComColaboradores(idPapel: string) : Promise<(Papel & { Colaboradores: Colaborador[]; } | null) | null>;
  atualizarStatusAtivoDopapel(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    estaAtivo: boolean, idPapel: string) : Promise<Papel>
}

export { IRepositorioPapel }