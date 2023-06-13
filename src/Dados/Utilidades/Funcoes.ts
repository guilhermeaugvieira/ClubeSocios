import PrismaInstance from "../../PrismaInstance";

const limparBancoDeDados = async () => {
  await PrismaInstance.$transaction([
    PrismaInstance.veiculoSocio.deleteMany(),
    PrismaInstance.pagamentoSocio.deleteMany(),
    PrismaInstance.dependente.deleteMany(),
    PrismaInstance.colaborador.deleteMany(),
    PrismaInstance.papel.deleteMany(),
    PrismaInstance.socio.deleteMany(),
    PrismaInstance.cliente.deleteMany(),
    PrismaInstance.endereco.deleteMany(),
    PrismaInstance.plano.deleteMany(),
  ]);
}

export { limparBancoDeDados };