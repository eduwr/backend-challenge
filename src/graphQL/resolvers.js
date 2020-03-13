const resolvers = {
  Query: {
    suitablePlanets: async (
      parent,
      { page, pageSize, numberOfPages },
      { dataSources }
    ) => {
      const allPlanets = await dataSources.exoplanetsAPI.getAllExoplanets(
        page,
        pageSize,
        numberOfPages
      );

      const suitablePlanets = allPlanets.filter(planet => planet.mass >= 25);
      const message = `[${suitablePlanets.length}] suitable planets found in this section`;

      return { message, suitablePlanets };
    },
    exoplanet: async (parent, { name }, { dataSources }) => {
      const planet = await dataSources.exoplanetsAPI.getExoplanetByName(name);
      return planet;
    },
  },
  Mutation: {
    installStation: async (parent, { name }, { dataSources, Station }) => {
      const stationSite = await dataSources.exoplanetsAPI.getExoplanetByName(
        name
      );

      const [station, created] = await Station.findOrCreate({
        where: { name: stationSite.name, mass: stationSite.mass },
      });

      const message = created
        ? `Congrats! Station created successfully on planet ${name}!`
        : `Alert! The planet ${name} already has a fully operational station!`;

      return { success: created, message, exoplanet: station };
    },
  },
  Exoplanet: {
    async hasStation(exoplanet, args, { Station }) {
      const isOnDB = await Station.findOne({
        where: { name: exoplanet.name },
      });
      if (isOnDB) {
        return true;
      }
      return false;
    },
  },
};

export default resolvers;
