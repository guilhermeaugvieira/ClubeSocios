# 3 - Framework de Desenvolvimento Backend

* Status: accepted <!-- optional -->
* Deciders: Todos <!-- optional -->
* Date: 15/05/2023, 00:07:00 <!-- optional -->
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) <!-- optional -->

Technical Story: link <!-- optional -->

## Context and Problem Statement

A aplicação poderia ser construída com DotNet Core ou Node JS, uma das duas tecnologias deveria ser escolhida

## Decision Drivers <!-- optional -->


## Considered Options

* DotNet Core
* Node Js

## Decision Outcome

Node Js foi escolhido por ter uma linha de aprendizado menor se comparado a DotNet, uma vez que somente um integrante do Grupo tinha conhecimento

### Positive Consequences <!-- optional -->

* Suporte pode ser dado por qualquer membro do grupo

### Negative Consequences <!-- optional -->

* Padrões arquiteturas que podem ser simplesmente implementados, demandam algumas adaptações

## Pros and Cons of the Options <!-- optional -->

### Node Js

* Excelente, utiliza typescript que possui uma vasta comunidade que presta suporte
* Ruim, como tem propósito geral tem comportamentos que são implementados diferentes de outras tecnologias

### DotNet Core

* Excelente, o suporte que a microsoft oferece é de grande ajuda
* Ruim, seria necessário o restante do time aprender uma nova linguagem
* Excelente, possui tipos de projetos que estabelece comportamentos de acordo com área de aplicação


<!-- markdownlint-disable-file MD013 -->