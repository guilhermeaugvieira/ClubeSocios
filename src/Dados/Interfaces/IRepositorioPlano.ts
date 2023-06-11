import { Plano, Prisma, PrismaClient } from "@prisma/client"

interface IRepositorioPlano {
  ObterPlanoPorId(idPlano: string) : Promise<Plano | null>;
  ObterPlanoPorNome(nomePlano: string) : Promise<Plano | null>;
  ObterTodosOsPlanos() : Promise<Plano[]>;
  AdicionarPlano(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
  nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string, idNovoPlano?: string): Promise<Plano>
}

export { IRepositorioPlano }