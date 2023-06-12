import { Plano, Prisma, PrismaClient, Socio } from "@prisma/client"

interface IRepositorioPlano {
  obterPlanoPorId(idPlano: string) : Promise<Plano | null>;
  obterPlanoPorNome(nomePlano: string) : Promise<Plano | null>;
  obterTodosOsPlanos() : Promise<Plano[]>;
  adicionarPlano(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string, idNovoPlano?: string): Promise<Plano>;
  atualizarDadosPlano(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    nome: string, descricao: string, tipoRecorrencia: string, valorMensalidade: number, modalidade: string, idPlano: string): Promise<Plano>;
  atualizarStatusAtivoDoPlano(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    status: boolean, idPlano: string): Promise<Plano>;
  obterPlanoComSocios(idPlano: string): Promise<(Plano & { Socios: Socio[]; } | null) | null>
}

export { IRepositorioPlano }