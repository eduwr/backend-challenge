const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Station = require('../models/Station');

const connection = new Sequelize(dbConfig);

Station.init(connection);

module.exports = connection;
