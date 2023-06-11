-- CreateTable
CREATE TABLE "clientes" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "documento" VARCHAR(11) NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "login" VARCHAR(30) NOT NULL,
    "senha" VARCHAR(256) NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enderecos" (
    "id" UUID NOT NULL,
    "pais" VARCHAR(30) NOT NULL,
    "cidade" VARCHAR(30) NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "bairro" VARCHAR(40) NOT NULL,
    "rua" VARCHAR(40) NOT NULL,
    "numero" INTEGER,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,

    CONSTRAINT "enderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "descricao" VARCHAR(256) NOT NULL,
    "tipo_recorrencia" VARCHAR(15) NOT NULL,
    "valor_mensalidade" DECIMAL(7,2) NOT NULL,
    "modalidade" VARCHAR(30) NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socios" (
    "id" UUID NOT NULL,
    "apelido" VARCHAR(30),
    "dia_vencimento_pagamento" INTEGER NOT NULL,
    "contato" VARCHAR(15) NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,
    "fk_plano" UUID NOT NULL,
    "fk_cliente" UUID NOT NULL,
    "fk_endereco" UUID NOT NULL,

    CONSTRAINT "socios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculos_socios" (
    "id" UUID NOT NULL,
    "placa" VARCHAR(8) NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,
    "fk_socio" UUID NOT NULL,

    CONSTRAINT "veiculos_socios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dependentes" (
    "id" UUID NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,
    "fk_cliente" UUID NOT NULL,
    "fk_socio" UUID NOT NULL,

    CONSTRAINT "dependentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos_socios" (
    "id" UUID NOT NULL,
    "forma_pagamento" VARCHAR(30) NOT NULL,
    "data_efetivacao_pagamento" TIMESTAMP NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,
    "fk_socio" UUID NOT NULL,
    "fk_plano" UUID NOT NULL,

    CONSTRAINT "pagamentos_socios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "papeis" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,

    CONSTRAINT "papeis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colaboradores" (
    "id" UUID NOT NULL,
    "data_criacao" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" TIMESTAMP,
    "fk_cliente" UUID NOT NULL,
    "fk_papel" UUID NOT NULL,

    CONSTRAINT "colaboradores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_documento_key" ON "clientes"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_email_key" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_login_key" ON "clientes"("login");

-- CreateIndex
CREATE UNIQUE INDEX "planos_nome_key" ON "planos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "socios_contato_key" ON "socios"("contato");

-- CreateIndex
CREATE UNIQUE INDEX "socios_fk_cliente_key" ON "socios"("fk_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "socios_fk_endereco_key" ON "socios"("fk_endereco");

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_socios_placa_key" ON "veiculos_socios"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "dependentes_fk_cliente_key" ON "dependentes"("fk_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "papeis_nome_key" ON "papeis"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "colaboradores_fk_cliente_fk_papel_key" ON "colaboradores"("fk_cliente", "fk_papel");

-- AddForeignKey
ALTER TABLE "socios" ADD CONSTRAINT "socios_fk_plano_fkey" FOREIGN KEY ("fk_plano") REFERENCES "planos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socios" ADD CONSTRAINT "socios_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socios" ADD CONSTRAINT "socios_fk_endereco_fkey" FOREIGN KEY ("fk_endereco") REFERENCES "enderecos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "veiculos_socios" ADD CONSTRAINT "veiculos_socios_fk_socio_fkey" FOREIGN KEY ("fk_socio") REFERENCES "socios"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dependentes" ADD CONSTRAINT "dependentes_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dependentes" ADD CONSTRAINT "dependentes_fk_socio_fkey" FOREIGN KEY ("fk_socio") REFERENCES "socios"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos_socios" ADD CONSTRAINT "pagamentos_socios_fk_socio_fkey" FOREIGN KEY ("fk_socio") REFERENCES "socios"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos_socios" ADD CONSTRAINT "pagamentos_socios_fk_plano_fkey" FOREIGN KEY ("fk_plano") REFERENCES "planos"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaboradores" ADD CONSTRAINT "colaboradores_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaboradores" ADD CONSTRAINT "colaboradores_fk_papel_fkey" FOREIGN KEY ("fk_papel") REFERENCES "papeis"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
