# 6 - Banco De Dados

* Status: accepted <!-- optional -->
* Deciders: Todos <!-- optional -->
* Date: 15/05/2023, 00:38:00 <!-- optional -->
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) <!-- optional -->

Technical Story: link <!-- optional -->

## Context and Problem Statement

Era necessário escolher entre um banco de dados que permitisse adição e alteração de dados com frequência, o grupo ficou entre MySql e Postresql

## Decision Drivers <!-- optional -->

## Considered Options

* MySql
* Postgresql

## Decision Outcome

O Postgresql foi escolhido por que já foi abordado em disciplinas anteriores da faculdade, além do fato de permitir inserções mais rápidas e inicialmente é visado um grande volume de dados para ser adicionado

### Positive Consequences <!-- optional -->

* A manutenção pode ser feita por todos os membros do grupo

### Negative Consequences <!-- optional -->

* O sistema do banco faz com que seja mais lento obter dados, e isso precisará ser constantemente executado na entrada

## Pros and Cons of the Options <!-- optional -->

### MySql

* Excelente, obtém os dados de maneira mais rápida
* Excelente, por ser indexada de forma diferente permite atualizar os dados de forma mais eficiente
* Ruim, a cada inserção o sistema precisa recalcular os índices da tabela

### Postgresql

* Excelente, adição de dados é feita de maneira mais rápida
* Excelente, a tabela não sofre com re-ordenação sempre que um valor é adicionado

<!-- markdownlint-disable-file MD013 -->