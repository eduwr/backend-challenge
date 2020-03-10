import { ApolloServer } from 'apollo-server';
import ExoplanetsAPI from './datasources/ExoplanetsAPI';
import resolvers from './graphQL/resolvers';
import typeDefs from './graphQL/schema';
import Station from './models/Station';

import './database';

const dataSources = () => ({
  exoplanetsAPI: new ExoplanetsAPI(),
});

const context = {
  Station,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// For e2e integration test purposes only

const pieces = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  ExoplanetsAPI,
  server,
};

export default pieces;
