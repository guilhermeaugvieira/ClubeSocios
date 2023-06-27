import { Cliente, Dependente, Endereco, Plano, Prisma, PrismaClient, Socio, VeiculoSocio } from "@prisma/client"

interface IRepositorioSocio {
  obterSocioPorId(idSocio: string) : Promise<Socio | null>;
  obterSocioPorIdDoCliente(idCliente: string) : Promise<Socio | null>;
  obterSocioPorContato( contatoSocio: string ) :Promise<Socio | null>;
  obterTodosOsSociosComPlanoEnderecoClienteVeiculosEDependentesComCliente() :Promise<(Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; Veiculos: VeiculoSocio[]; Dependentes: (Dependente & { Cliente: Cliente})[]})[]>;
  obterSocioComPlanoEnderecoClienteVeiculosEDependentesComClientePeloId(idSocio: string) :Promise<(Socio & { Plano: Plano; Cliente: Cliente; Endereco: Endereco; Veiculos: VeiculoSocio[]; Dependentes: (Dependente & { Cliente: Cliente})[]}) | null>;
  adicionarSocio(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    diaVencimentoPagamento: number, contato: string, idPlano: string, idCliente: string, idEndereco: string, apelido?: string | null, idNovoSocio?: string) :Promise<Socio>
  atualizarDadosSocio(transactionContext: Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends" >, 
    diaVencimentoPagamento: number, contato: string, idPlano: string, idSocio: string, apelido?: string | null) :Promise<Socio>;
  obterSocioComEnderecoEClientePorId(idSocio: string) : Promise <(Socio & { Endereco: Endereco, Cliente: Cliente }) | null>;
}

export { IRepositorioSocio }