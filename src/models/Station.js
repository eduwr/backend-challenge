import { Model, DataTypes } from 'sequelize';

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

export default Station;
