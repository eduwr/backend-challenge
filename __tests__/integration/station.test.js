const truncate = require('../__utils/utils');

const {
  Station,
  // ExoplanetsAPI,
  // typeDefs,
  // resolvers,
  // ApolloServer,
} = require('../../src/server');

describe('Create stations', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Must create a station on DB', async () => {
    const station = await Station.create({ name: 'pizzaplanet', mass: 26 });

    expect(station.name).toBe('pizzaplanet');
  });
});
