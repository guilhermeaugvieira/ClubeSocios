# Requisitos Necessários para utilizar o projeto #
[x] [Docker](https://www.docker.com/products/docker-desktop/)<br/>
[x] [Node Js](https://nodejs.org/en)<br/>
[ ] Postgresql(Pode ser utilizado o mesmo docker-compose do projeto)

# Setup do Projeto #

1. Acessar a pasta raiz do projeto
2. Executar o seguinte comando para instalar todos os pacotes necessários
```bash
  npm i
```
3. Copiar o arquivo .env.example, renomeando para .env.development e alterar a variável DATABASE_URL para o caminho do seu banco de dados.
4. Executar o seguinte comando para gerar as tabelas na sua base de dados
```bash
  npm run prisma-migrate-dev:dev
```
5. Executar a api pelo comando
```bash
  npm run start:dev
```
5. Acessar a API através da porta exibida no console, essa configuração fica no .env.development (por padrão a 3000).
6. A rota de teste para saber se está tudo certo é [Link de Teste](http://localhost:3000)
7. As rotas utilizam o prefixo api, desta forma todas as rotas do projeto, com exceção a rota de teste são acessadas através do [Link da API](http://localhost:3000/api/)

# Testes Automatizados do Projeto #
Os testes automatizados do projeto incluem testes de integração e unitários, para sua execução execute 
```bash
  npm run test:dev
```

# Recursos aplicados no Projeto #
[X] _Swagger_<br/>
[X] _Tsyringe_<br/>
[X] _Autenticação Jwt_<br/>
[X] _Prisma ORM_<br/>
[X] _SOLID_<br/>
[X] _Fluent Assertions_<br/>
[X] _Notification Pattern_<br/>
[X] _Service Pattern_<br/>

