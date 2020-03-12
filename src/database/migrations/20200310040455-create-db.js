require('dotenv').config();

module.exports = {
  up: queryInterface => {
    return queryInterface.createDatabase({ database: process.env.DB_NAME });
  },

  down: queryInterface => {
    return queryInterface.dropDatabase({ database: process.env.DB_NAME });
  },
};
