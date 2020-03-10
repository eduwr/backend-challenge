// module.exports = {
//   username: 'eduardo',
//   password: 123456,
//   database: 'stations',
//   host: 'localhost',
//   dialect: 'postgres',
//   define: {
//     timestamps: true,
//     underscored: true,
//   },
// };
require('dotenv').config();

module.exports = {
  username: process.env.DB_User,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
  },
};
