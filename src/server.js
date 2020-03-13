import { ApolloServer } from 'apollo-server';

import ExoplanetsAPI from './datasources/ExoplanetsAPI';
import resolvers from './graphQL/resolvers';
import typeDefs from './graphQL/schema';
import Station from './models/Station';

require('./database');

require('dotenv').config();

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

const PORT = 4000;
const HOST = '0.0.0.0';

server.listen(PORT, HOST).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
