import { Cliente, Endereco, Plano, Prisma, PrismaClient, Socio } from "@prisma/client"

interface IRepositorioSocio {
  ObterSocioComEnderecoECliente(idSocio: string) : Promise<(Socio & { Cliente: Cliente; Endereco: Endereco; }) | null>
  ObterSocioPorIdDoCliente(idCliente: string) : Promise<Socio | null>;
  ObterSocioPorContato( contatoSocio: string ) :Promise<Socio | null>;
  ObterTodosOsSociosComPlanoEnderecoECliente() :Promise<(Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; })[]>;
  ObterSocioComPlanoEnderecoEClientePeloId(idSocio: string) :Promise<(Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; }) | null>;
  AdicionarSocio(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    diaVencimentoPagamento: number, contato: string, idPlano: string, idCliente: string, idEndereco: string, apelido?: string | null, idNovoSocio?: string) :Promise<Socio>
  AtualizarDadosSocio(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">, 
    diaVencimentoPagamento: number, contato: string, idPlano: string, idSocio: string, apelido?: string | null) :Promise<Socio>
}

export { IRepositorioSocio }