# 2 - Documentação API

* Status: accepted <!-- optional -->
* Deciders: Guilherme <!-- optional -->
* Date: 15/05/2023, 00:00:22 <!-- optional -->
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) <!-- optional -->

Technical Story: link <!-- optional -->

## Context and Problem Statement

Como o backend trabalha com a API, deveria ser disponibilizada uma forma de documentar as entradas e saídas dos endpoints

## Decision Drivers <!-- optional -->


## Considered Options

* Swagger
* OpenAPI

## Decision Outcome

Foi escolhido o swagger pela ferramenta apresentar problemas ao utilizar o módo OpenAPI

### Positive Consequences <!-- optional -->

* Toda a documentação pode ser testada sem nenhum problema

### Negative Consequences <!-- optional -->

* Autenticação não pode ser especificada como deveria, especificando o tipo de token bearer
* Não é possível informar quando o campo é opcional

## Pros and Cons of the Options <!-- optional -->

### Swagger

* Excelente, a documentação é simples de gerar

### OpenAPI

* Ruim, Apresentou falhar ao gerar as requisições


<!-- markdownlint-disable-file MD013 -->