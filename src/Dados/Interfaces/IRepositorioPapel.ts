import { Papel, Prisma, PrismaClient } from "@prisma/client";

interface IRepositorioPapel {
  ObterPapelPorId(idPapel: string) : Promise<Papel | null>;
  ObterPapelPorNome(nomePapel: string) : Promise<Papel | null>;
  ObterTodosOsPapeis() :Promise<Papel[]>;
  AdicionarPapel(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nomePapel: string, idNovoPapel?: string) : Promise<Papel>
}

export { IRepositorioPapel }