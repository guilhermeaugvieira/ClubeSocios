import { Cliente, Colaborador, Prisma, PrismaClient } from "@prisma/client";

interface IRepositorioColaborador {
  ObterColaboradorPorClienteEPapel(idCliente: string, idPapel: string): Promise <Colaborador | null>;
  AdicionarColaborador(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    idCliente: string, idPapel: string, idNovoColaborador?: string) : Promise<Colaborador>;
}

export { IRepositorioColaborador }