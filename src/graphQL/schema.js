const { gql } = require('apollo-server');

const typeDefs = gql`
  type Exoplanet {
    name: String!
    mass: Int!
    hasStation: Boolean!
  }

  type installStationResponse {
    success: Boolean!
    message: String!
    exoplanet: Exoplanet
  }

  type suitablePlanetsResponse {
    message: String!
    suitablePlanets: [Exoplanet!]
  }

  type Station {
    id: ID!
    name: String!
    mass: Int!
  }

  type allStationsResponse {
    message: String!
    stations: [Station]
  }

  type destroyStationResponse {
    message: String!
    success: Boolean!
  }

  type Query {
    exoplanet(name: String!): Exoplanet!
    suitablePlanets(
      page: Int
      pageSize: Int
      numberOfPages: Int
    ): suitablePlanetsResponse!
    allStations: allStationsResponse!
    findStationByID(id: ID!): Station
  }

  type Mutation {
    installStation(name: String!): installStationResponse!
    destroyStation(id: ID!): destroyStationResponse!
  }
`;

export default typeDefs;
