import { RESTDataSource } from 'apollo-datasource-rest';

class ExoplanetsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.arcsecond.io/';
  }

  planetReducer(planet) {
    return {
      name: planet.name || 'nameless',
      mass: planet.mass ? parseInt(planet.mass.value, 10) : 0,
    };
  }

  async getAllExoplanets(page = 1, pageSize = 50, numberOfPages = 1) {
    if (numberOfPages > 1) {
      const newPageSize = pageSize * numberOfPages;
      const { results } = await this.get(
        `exoplanets/?page=${page}&page_size=${newPageSize}`
      );
      return results.map(exoplanet => this.planetReducer(exoplanet));
    }

    const { results } = await this.get(
      `exoplanets/?page=${page}&page_size=${pageSize}`
    );
    return results.map(exoplanet => this.planetReducer(exoplanet));
  }

  async getExoplanetByName(name) {
    const exoplanet = await this.get(`exoplanets/${name}`);
    return this.planetReducer(exoplanet);
  }
}

export default ExoplanetsAPI;
