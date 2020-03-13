# Backend Challenge

This is a GraphQL API that mine [Arcsecond](https://api.arcsecond.io/swagger/) data to find suitable planets to install ion propulsion stations.

*Read this in other languages:* [*Português*](https://github.com/eduwr/backend-challenge/blob/master/README.en.md)

## Getting Started with docker-compose


### Prerequesites

- [Git](https://git-scm.com/downloads)
- [Docker](https://docs.docker.com/install/)
- [Docker-compose](https://docs.docker.com/compose/install/)

### Initialization

Clone this repository.

```bash
git clone https://github.com/eduwr/
```

Certify [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installation.

```bash
$ docker -v
docker version 19.03.8, build afacb8b7f0
$ docker-compose -v
docker-compose version 1.25.4, build 8d51620a
```

You can start the database and the server with the following command.

```bash
docker-compose up
```
(You may need administrative privileges on linux)

This docker-compose was set to create a [PostgreSQL](https://hub.docker.com/_/postgres) container and an [Apollo](https://www.apollographql.com/) server with Node on port 4000. Since the environment variables are configured on .env file, all should work automatically.

> Note: The data base setting doesn't persist data after the container stops. Thus we don't recommend to use this method in production.


## Local initialization

### Prerequisites

- [Node (min: v 10.15.0)](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)

### Initialization

Clone this repository.

```bash
git clone https://github.com/eduwr
```

Set the environment variables on .env file to connect to your database as follows:

```
#Database Credentials

DB_HOST=localhost
DB_USER=<seu_usuário_do_banco_de_dados>
DB_PASS=<sua_senha_do_banco_de_dados>
DB_NAME=<seu_banco_de_dados>

#Server config
API_HOST=localhost
API_PORT=
```

> Note: This application uses sequelize to connect to PostgreSQL, if you are willing to use another database you must configure the database acess on folder src/config/database.js and add the proper dependencies as recommended on [sequelize documentation](https://sequelize.org/v5/manual/dialects.html).

Install all the dependencies.

```bash
npm i
```

Start the project
```bash
npm start
```
> Note: Jest documentation uses yarn commands, but npm will also work. You can compare yarn and npm commands in the [yarn docs, here](https://classic.yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison).

Execute migrations to database.
```bash
npx sequelize db:migrate
```

Start the server.
```bash
npm start
```

## Usage

### GraphQL Playground

Apollo Server enables GraphQL Playground on the same URL as the GraphQL server itself (e.g. http://localhost:4000/graphql) and automatically serves the GUI to web browsers.
[GraphQL playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/).

### Queries

__1.__ __suitablePlanets__*(page: **_Int_**, pageSize: **_Int_**, numberOfPages: **_Int_**)*

Search for suitable exoplanets to install new ion propulsion stations.

> Returns a message with the number of suitable planets found and an array with all the planets.

As Arcsecond return paginated results from his API, this query method accepts three optional parameters to fit the pagination:

* __page__: A page number within the paginated result set. (default = 1).
* __pageSize__: Number of results to return per page. (default = 50).
* __numberOfPages__: Number of pages shown in result (default = 1).

__Exemple__:

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

__Return__

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

Search for one suitable planet finding by name.

> Returns an object with the name, mass and if this planet already has a station installed.

Parameters:
- __name__: Planet name. Required.


__Exemple__:

```graphql
query {
  exoplanet(name: "CoRoT-15 b"){
    name
    mass
    hasStation
  }
}

```

__Return__:

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

Search for all stations on database.

> Returns a message with the numbers of stations found and an array with all stations found.

__Exemple__:

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

Find by id an station on database.

> Returns an object with the station id, name and mass of the planet in which station is installed.

Parametes:
- __id__: Station id. Required.

__Exemple__:

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


__Exemple__:

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

__Return__

* Success

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

* Fail

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

Remove a station from database

> Returns a response informing if the station was successfully destroyed.

Parameters:
- __id__: Station id. Required.


__Exemple__:

```graphql
mutation {
  destroyStation (id: 5) {
    success
    message
  }
}

```

__Return__

* Success

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

* Fail

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