'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Memories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Memories.init({
    name: DataTypes.STRING,
    mediaPath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Memories',
  });
  return Memories;
};