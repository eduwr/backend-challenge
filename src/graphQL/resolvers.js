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
    allStations: async (parent, args, { Station }) => {
      const response = await Station.findAll({
        attributes: ['id', 'name', 'mass'],
      });

      const allStations = response.map(data => data.dataValues);

      return {
        message: allStations
          ? `[${allStations.length}] stations found`
          : "We don't have operational stations",
        stations: allStations,
      };
    },
    findStationByID: async (parent, { id }, { Station }) => {
      const station = Station.findByPk(id);
      console.log(station);
      return station;
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

    destroyStation: async (parent, { id }, { Station }) => {
      const response = await Station.destroy({ where: { id } });
      const message = response
        ? `Station ${id} became stardust!`
        : `Station ${id} does not exist!`;
      const success = !!response;
      return { message, success };
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
