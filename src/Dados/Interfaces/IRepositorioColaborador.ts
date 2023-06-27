import { Cliente, Colaborador, Prisma, PrismaClient } from "@prisma/client";

interface IRepositorioColaborador {
  obterColaboradorPorClienteEPapel(idCliente: string, idPapel: string): Promise <Colaborador | null>;
  adicionarColaborador(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    idCliente: string, idPapel: string, idNovoColaborador?: string) : Promise<Colaborador>;
}

export { IRepositorioColaborador }