'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cube extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cube.init({
    userId: DataTypes.INTEGER,
    hasPoint: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cube',
  });
  return Cube;
};