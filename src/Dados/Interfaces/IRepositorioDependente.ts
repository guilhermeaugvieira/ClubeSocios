import { Cliente, Dependente, Endereco, Plano, Prisma, PrismaClient, Socio } from "@prisma/client";

interface IRepositorioDependente {
  obterDependentePorIdDoCliente(idCliente: string): Promise<Dependente | null>;
  adicionarDependente(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    idCliente: string, idSocio: string, idNovoDependente?: string
  ) : Promise<Dependente>;
  atualizarDependente(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    idDependente?: string) : Promise<Dependente>
  obterDependenteComClienteEDadosDoSocioPorIdDoDependente(idDependente: string): Promise<(Dependente & { Cliente: Cliente, Socio: (Socio & { Cliente: Cliente, Plano: Plano, Endereco: Endereco }) }) | null>;
}

export { IRepositorioDependente };