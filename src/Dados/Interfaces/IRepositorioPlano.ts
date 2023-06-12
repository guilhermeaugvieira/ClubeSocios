import { Plano, Prisma, PrismaClient } from "@prisma/client"

interface IRepositorioPlano {
  obterPlanoPorId(idPlano: string) : Promise<Plano | null>;
  obterPlanoPorNome(nomePlano: string) : Promise<Plano | null>;
  obterTodosOsPlanos() : Promise<Plano[]>;
  adicionarPlano(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string, idNovoPlano?: string): Promise<Plano>
}

export { IRepositorioPlano }