# 1 - Gerenciamento de Dados

* Status: accepted <!-- optional -->
* Deciders: Todos <!-- optional -->
* Date: 14/05/2023, 23:50:41 <!-- optional -->
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) <!-- optional -->

Technical Story: link <!-- optional -->

## Context and Problem Statement

O Gerenciamento do banco de dados precisa ser feito por algum ORM, foi escolhido entre o TypeOrm e o Prisma

## Decision Drivers <!-- optional -->


## Considered Options

* Prisma
* TypeOrm

## Decision Outcome

Escolhido o Prisma pelo mapeamento simplificado e intuitivo de entidades do banco de dados

### Positive Consequences <!-- optional -->

* Guias de Testes de Integração e Unidade disponibilizados pelos mantedores da ferramenta

### Negative Consequences <!-- optional -->

* Reaprendizado da ferramenta

## Pros and Cons of the Options <!-- optional -->

### Prisma

* Excelente, pelo mapeamento intuitivo das entidades
* Excelente, pela documentação disponibilizada
* Excelente, pelas extensões disponibilizadas para codificações
* Ruim, forma de informar a connection string do banco

### TypeOrm

* Ruim, mapeamento complexo das entidades
* Excelente, forma de informar os dados da connection string

<!-- markdownlint-disable-file MD013 -->