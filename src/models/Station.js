const { Model, DataTypes } = require('sequelize');

class Station extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        mass: DataTypes.INTEGER,
      },
      { sequelize: connection, tableName: 'stations' }
    );
  }
}

module.exports = Station;
