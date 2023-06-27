import { Cliente, Dependente, Endereco, Plano, Prisma, PrismaClient, Socio, VeiculoSocio } from "@prisma/client";

interface IRepositorioVeiculoSocio{
  obterVeiculoSocioPelaPlaca(placa: string) : Promise<(VeiculoSocio & { Socio: (Socio & { Cliente: Cliente; Endereco: Endereco; Plano: Plano; Dependentes: (Dependente & { Cliente: Cliente })[]}) }) | null>;
  adicionarVeiculoSocio(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    placa: string, idSocio: string, idNovoVeiculo?: string
  ): Promise<VeiculoSocio>;
  obterVeiculoSocioPorId(idVeiculo: string) : Promise<(VeiculoSocio & { Socio: (Socio & { Cliente: Cliente; Endereco: Endereco; Plano: Plano; Dependentes: (Dependente & { Cliente: Cliente })[]}) }) | null>;
  atualizarVeiculoSocio(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    placa: string, idVeiculo: string
  ): Promise<VeiculoSocio>;
  atualizarStatusAtivoVeiculoSocio(
    transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >,
    estaAtivo: boolean, idVeiculo: string
  ): Promise<VeiculoSocio>
}

export { IRepositorioVeiculoSocio };