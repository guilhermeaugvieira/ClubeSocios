import { Cliente, Dependente, Endereco, Plano, Prisma, PrismaClient, Socio, VeiculoSocio } from "@prisma/client";

interface IRepositorioVeiculoSocio{
  adicionarVeiculoSocio(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    placa: string, idSocio: string, idNovoVeiculo?: string
  ): Promise<VeiculoSocio>;
  atualizarVeiculoSocio(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    placa: string, idVeiculo: string
  ): Promise<VeiculoSocio>;
  atualizarStatusAtivoVeiculoSocio(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    estaAtivo: boolean, idVeiculo: string
  ): Promise<VeiculoSocio>;
  obterVeiculoSocioPelaPlaca(placa: string) : Promise<VeiculoSocio | null>;
  obterVeiculoSocioPorId(idVeiculo: string) : Promise<VeiculoSocio | null>;
  obterVeiculosPeloIdSocio(idSocio: string) : Promise<VeiculoSocio[]>
}

export { IRepositorioVeiculoSocio };