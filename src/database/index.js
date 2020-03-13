import Sequelize from 'sequelize';
import dbConfig from '../config/database';
import Station from '../models/Station';

const connection = new Sequelize(dbConfig);

Station.init(connection);

export default connection;
