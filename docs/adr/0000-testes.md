# 0 - Testes

* Status: accepted <!-- optional -->
* Deciders: Guilherme <!-- optional -->
* Date: 14/05/2023, 23:37:51 <!-- optional -->
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) <!-- optional -->

Technical Story: link <!-- optional -->

## Context and Problem Statement

A fim de adicionar testes automatizados na aplicação, foi verificado os frameworks de testes mais utilizados para node js que suportassem typescript

## Decision Drivers <!-- optional -->


## Considered Options

* Jest
* Typescrpt

## Decision Outcome

Escolhido o Jest por já possuir um tempo significativo no mercado e por isso viabilizar um melhor suporte da comunidade

### Positive Consequences <!-- optional -->

* A ferramenta não precisa de complementos para gerar log de cobertura

### Negative Consequences <!-- optional -->

* A ferramenta não possui interface visual

## Pros and Cons of the Options <!-- optional -->

### Jest

* A ferramenta reseta os mocks corretamente, impedindo erros no teste de integração
* A ferramenta é completa com opçoes de pacotes adicionais, que permitem extender algumas funcionalidades
* Ruim, porque precisa executar todos os testes sempre
* Excelente, por ter um grande suporte da comunidade

### ViTest

* Boa, porque possui interface visual intuitiva
* Excelente, porque roda os testes associados aos arquivos que sofreram alteração
* Ruim, porque na interface visual os mesmos testes de integração que ao serem executados no terminal passam, na interface visual falham
* Ruim, porque precisa de complementos para geração de log de cobertura

<!-- markdownlint-disable-file MD013 -->