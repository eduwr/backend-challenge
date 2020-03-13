# Backend Challenge

API GraphQL que utiliza a API da [Arcsecond](https://api.arcsecond.io/swagger/) para descobrir planetas adequados à instalação de novos postos de carregamento de veículos com propulsão de íons.

*Outras Línguas:* [*English*](https://github.com/eduwr/backend-challenge/blob/master/README.en.md)

## Instalação com docker-compose


### Pré-requisitos

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)

### Inicialização

Clone este repositório no diretório desejado com o comando a baixo no terminal:

```bash
git clone https://github.com/eduwr
```

Verifique se possui o [docker](https://docs.docker.com/install/) e o [docker-compose](https://docs.docker.com/compose/install/) instalado.

```bash
$ docker -v
docker version 19.03.8, build afacb8b7f0
$ docker-compose -v
docker-compose version 1.25.4, build 8d51620a
```

No diretório em que o repositório foi clonado inicie o banco de dados e o servidor com o comando a baixo:

```bash
docker-compose up
```
(obs: no linux pode ser que seja necessário privilégio administrativo usando sudo)

O docker-compose foi configurado para criar um container com banco de dados [PostgreSQL](https://hub.docker.com/_/postgres) e um servidor [Apollo](https://www.apollographql.com/) com Node rodando na porta 4000. Portanto as variáveis de ambiente no arquivo .env já estão configuradas para que tudo funcione automaticamente.

O banco de dados foi configurado para não persistir os dados após o conteiner parar, portanto não recomendamos utilizar esse método em produção.


## Inicialização Local

### Pré-requisitos

- [Node (min: v 10.15.0)](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm) ou [yarn](https://yarnpkg.com/)

### Inicialização

Clone este repositório no diretório desejado com o comando a baixo no terminal:

```bash
git clone https://github.com/eduwr
```


Configure as variáveis de ambiente para conexão com o seu banco de dados no arquivo .env localizado na raiz do projeto conforme a baixo:


```
#Database Credentials

DB_HOST=localhost
DB_USER=<seu_usuário_do_banco_de_dados>
DB_PASS=<sua_senha_do_banco_de_dados>
DB_NAME=<seu_banco_de_dados>

API_HOST=localhost
```

Obs: Esta aplicação utiliza um ORM para integração com o PostgreSQL, para utilizar outros bancos deve-se configurar o arquivo de configuração do banco de dados no diretório src/config e adicionar as dependências necessárias, conforme a documentação do [Sequelize](https://sequelize.org/v5/manual/dialects.html).

Instale as dependências com o comando a baixo na raiz do projeto.

```bash
npm i
```

Inicie o projeto
```bash
npm start
```
Esta documentação está utilizando o npm, mas o yarn também funcionará. Você pode comparar as equivalências dos comandos na [documentação do yarn](https://classic.yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison).

Execute as migrações para o banco de dados.
```bash
npx sequelize db:migrate
```
Isso faz com que o banco de dados e as tabelas sejam criadas com base no arquivo de configuração do banco de dados.

Inicie o servidor:
```bash
npm start
```



## Utilizando a API

### GraphQL Playground

O Apollo Server disponibiliza o [GraphQL playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/) em ambiente de desenvolvimento. O mesmo pode ser acessado com o navegador na mesma URL do servidor (ex. http://localhost:4000/graphql) e serve como uma interface gráfica para o usuário realizar queries e mutations.


### Queries

__1.__ __suitablePlanets__*(page: **_Int_**, pageSize: **_Int_**, numberOfPages: **_Int_**)*

Consulta planetas adequados à instalação de novos postos de abastecimento.

> Retorna uma mensagem informando o número de planetas adequados encontrados e um array com os planetas encontrados.


Como a API externa da arcsecond retorna resultados paginados a query e com o intuito de fornecer a possibilidade de paginação quando conectada à um client, esta query aceita três parâmetros opcionais, são eles:

* __page__: indica o número da página no conjunto de objetos paginados (padrão = 1).
* __pageSize__: indica o número de objetos pesquisados por página (padrão = 50).
* __numberOfPages__: indica o número de páginas que serão apresentadas por seção (padrão =1).

__Exemplo de aplicação__:

```graphql
query {
  suitablePlanets (page: 11, pageSize: 100, numberOfPages: 2) {
    message
    suitablePlanets {
      name
      mass
      hasStation
    }
  }
}

```

__Retorno__

```JSON
{
  "data": {
    "suitablePlanets": {
      "message": "[2] suitable planets found in this section",
      "suitablePlanets": [
        {
          "name": "HD 3651B",
          "mass": 53,
          "hasStation": true
        },
        {
          "name": "HD 4747 b",
          "mass": 60,
          "hasStation": false
        }
      ]
    }
  }
}
```

__2.__ __exoplanet__*(name: **_String!_**)*

Consulta um planeta adequado.

> Retorna um objeto informando o nome do planeta, a massa e se ele já possui uma estação instalada.

Parâmetros:
- __name__: nome do planeta a ser pesquisado. Obrigatório.


__Exemplo de aplicação__:

```graphql
query {
  exoplanet(name: "CoRoT-15 b"){
    name
    mass
    hasStation
  }
}

```

__Retorno__:

```JSON
{
  "data": {
    "exoplanet": {
      "name": "CoRoT-15 b",
      "mass": 63,
      "hasStation": false
    }
  }
}
```

__3.__ __allStations__

Consulta todas as estações no banco de dados.

> Retorna um array com todas as estações encontradas informando o id das estações, o nome e a massa do planeta no qual cada uma se encontra.

__Exemplo de aplicação__:

```graphql
query {
  allStations {
    message
    stations {
      id
      name 
    }
  }
}

```

__Retorno__:

```JSON
{
  "data": {
    "allStations": {
      "message": "[2] stations found",
      "stations": [
        {
          "id": "4",
          "name": "Cha Ha 8 b"
        },
        {
          "id": "5",
          "name": "CoRoT-15 b"
        }
      ]
    }
  }
}
```



__4.__ __findStationByID__*(id: **_ID!_**)*

Consulta uma estação no banco de dados pelo ID.

> Retorna um objeto informando o id da estação, o nome e a massa do planeta no qual ela se encontra.

Parâmetros:
- __id__: id da estação no banco de dados. Obrigatório.

__Exemplo de aplicação__:

```graphql
query {
  findStationByID(id: 5) {
    name
    id
    mass
  }
}
```

__Retorno__:

```JSON
{
  "data": {
    "findStationByID": {
      "name": "CoRoT-15 b",
      "id": "5",
      "mass": 63
    }
  }
}
```

### Mutations

__1.__ __installStation__*(name: **_String!_**)*

Cria uma estação em um planeta armazenando as informações do planeta em um banco de dados contendo todas as estações instaladas.

> Retorna uma resposta informando se a instalação foi concluída com sucesso ou se houve falha no processo.


__Exemplo de aplicação__:

```graphql
mutation {
  installStation(name: "Cha Ha 8 b!") {
    success
    message
    exoplanet{
      name
      mass
      hasStation
    }
  }
}

```

__Retorno__

* Instalação bem sucedida

```JSON
{
  "data": {
    "installStation": {
      "success": true,
      "message": "Congrats! Station created successfully on planet Cha Ha 8 b!",
      "exoplanet": {
        "name": "Cha Ha 8 b",
        "mass": 25,
        "hasStation": true
      }
    }
  }
}
```

* Instalação não realizada

```JSON
{
  "data": {
    "installStation": {
      "success": false,
      "message": "Alert! The planet Cha Ha 8 b already has a fully operational station!",
      "exoplanet": {
        "name": "Cha Ha 8 b",
        "mass": 25,
        "hasStation": true
      }
    }
  }
}
```

__2.__ __destroyStation__*(id: **_ID!_**)*

Remove uma estação do banco de dados.

> Retorna uma resposta informando se a destruição foi concluída com sucesso ou se houve falha no processo.

Parâmetros:
- __id__: id da estação no banco de dados. Obrigatório.


__Exemplo de aplicação__:

```graphql
mutation {
  destroyStation (id: 5) {
    success
    message
  }
}

```

__Retorno__

* Destruição bem sucedida

```JSON
{
  "data": {
    "destroyStation": {
      "success": true,
      "message": "Station 5 became stardust!"
    }
  }
}
```

* Destruição não realizada

```JSON
{
  "data": {
    "destroyStation": {
      "success": false,
      "message": "Station 5 does not exists!"
    }
  }
}
```