require('dotenv').config();

module.exports = {
  host: 'psql-container',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
  },
};
