import { Cliente, Dependente, Endereco, Plano, Prisma, PrismaClient, Socio } from "@prisma/client"

interface IRepositorioSocio {
  obterSocioComEnderecoECliente(idSocio: string) : Promise<(Socio & { Cliente: Cliente; Endereco: Endereco; }) | null>
  obterSocioPorIdDoCliente(idCliente: string) : Promise<Socio | null>;
  obterSocioPorContato( contatoSocio: string ) :Promise<Socio | null>;
  obterTodosOsSociosComPlanoEnderecoClienteEDependentesComCliente() :Promise<(Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; Dependentes: (Dependente & { Cliente: Cliente})[]})[]>;
  obterSocioComPlanoEnderecoClienteEDependentesComClientePeloId(idSocio: string) :Promise<(Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; Dependentes: (Dependente & { Cliente: Cliente})[]}) | null>;
  adicionarSocio(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    diaVencimentoPagamento: number, contato: string, idPlano: string, idCliente: string, idEndereco: string, apelido?: string | null, idNovoSocio?: string) :Promise<Socio>
  atualizarDadosSocio(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    diaVencimentoPagamento: number, contato: string, idPlano: string, idSocio: string, apelido?: string | null) :Promise<Socio>;
}

export { IRepositorioSocio }