# NestJS api

Um projeto desenvolvido utilizando NetsJs, typescript, docke, prismaIO, postgres

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
Node - v16+
docker 
vscode
yarn or npm
```

### 🔧 Instalação

 Guia de instalação 

```
git clone git@github.com:renatormsilva/meeguAPI.git

```

```
yarn -- para instalaar as dependências 

```

você pode escolher qual database usar, eu escolhi o postgres, se não souber como fazer basta criar um arquivo:

docker-compose.yml

```
version: "3.9"

services:
  database:
    image: postgres
    container_name: project
    restart: always
    ports: 
      - 5432:5432
    environment:
      - POSTGRES_USER=yourpostgresuser
      - POSTGRES_PASSWORD=yourpostgrespassword
      - POSTGRES_DB=yourpostgresdatabasename
    volumes:
      - pgdata:/data/postgres
volumes:
  pgdata:
    driver: local

```


depois disso: 

```
docker-compose up -d

```
e pronto seu banco de dados já está rodando 

para rodas as migrations do prisma basta usar 

```
yarn prisma migrate dev

```

ou seguir esse exemplo:

https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgres

para facilitar fiz deploy da aplicação no heroku

https://meeguapi.herokuapp.com/user

## 🛠️ Construído com


* [NestJs](https://nestjs.com/) 
* [typescript](https://www.typescriptlang.org/) - 
* [docker](https://www.docker.com/) -
* [prismaIO](hhttps://www.prisma.io/) -
* [JEST](https://jestjs.io/pt-BR/) - 
* [postgres](https://www.postgresql.org/) - 
* [heroku](https://www.heroku.com/) - 


⌨️ com ❤️ por [Renato Rodrigues](https://github.com/renatormsilva) 😊
