const { ApolloServer } = require('apollo-server');
const ExoplanetsAPI = require('./datasources/ExoplanetsAPI');
const resolvers = require('./graphQL/resolvers');
const typeDefs = require('./graphQL/schema');
const Station = require('./models/Station');

require('./database');

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

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

// For e2e integration test purposes only

module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  ExoplanetsAPI,
  server,
  Station,
};
