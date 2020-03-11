const {
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  ExoplanetsAPI,
} = require('../../src/server');

const constructTestServer = ({ context = defaultContext } = {}) => {
  const exoplanetsAPI = new ExoplanetsAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ exoplanetsAPI }),
    context,
  });

  return { server, exoplanetsAPI };
};

module.exports.constructTestServer = constructTestServer;
