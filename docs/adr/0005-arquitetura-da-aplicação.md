# 5 - Arquitetura da Aplicação

* Status: accepted <!-- optional -->
* Deciders: Guilherme <!-- optional -->
* Date: 15/05/2023, 00:23:34 <!-- optional -->
* Template used: [MADR 3.0.0](https://adr.github.io/madr/) <!-- optional -->

Technical Story: link <!-- optional -->

## Context and Problem Statement

A forma que seria arquiteturada a aplicação precisava de um padrão, foi escolhido entre um monolito e microsserviço e MVC

## Decision Drivers <!-- optional -->

## Considered Options

* Monolito
* Microsserviço
* MVC

## Decision Outcome

O modelo escolhido foi um monolito, com a aplicação da arquitetura limpa, viabilizando a independência do software como um todo

### Positive Consequences <!-- optional -->

* O desenvolvimento não precisa ser dependente de nenhum outro projeto

### Negative Consequences <!-- optional -->

* Toda a aplicação precisa ser deployada como uma só

## Pros and Cons of the Options <!-- optional -->

### Monolito

* Excelente, A aplicação só depende dela
* Ruim, A publicação do projeto é mais demorada
* Excelente, Cada camada pode ser organizada de acordo com sua complexidade

### Microsserviço

* Excelente, A aplicação é construída de outros módulos e por isso é necessário preocupar somente com a funcionalidade ofertada
* Ruim, A aplicação passa a ser mais reativa, o que demanda muito mais recursos como trabalha com filas
* Ruim, É necessário fazer checagem de tempo em tempo para ver se os recursos distribuídos estão disponíveis

### MVC

* É simples de organizar
* Ruim, Agrega muita responsabilidade a camada do controlador



<!-- markdownlint-disable-file MD013 -->