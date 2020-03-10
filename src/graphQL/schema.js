import { gql } from 'apollo-server';

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

  type Query {
    exoplanet(name: String!): Exoplanet!
    suitablePlanets(
      page: Int
      pageSize: Int
      numberOfPages: Int
    ): suitablePlanetsResponse!
  }

  type Mutation {
    installStation(name: String!): installStationResponse!
  }
`;

export default typeDefs;
