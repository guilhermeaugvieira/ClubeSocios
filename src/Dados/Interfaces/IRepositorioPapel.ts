import { Papel, Prisma, PrismaClient } from "@prisma/client";

interface IRepositorioPapel {
  obterPapelPorId(idPapel: string) : Promise<Papel | null>;
  obterPapelPorNome(nomePapel: string) : Promise<Papel | null>;
  obterTodosOsPapeis() :Promise<Papel[]>;
  adicionarPapel(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nomePapel: string, idNovoPapel?: string) : Promise<Papel>
}

export { IRepositorioPapel }