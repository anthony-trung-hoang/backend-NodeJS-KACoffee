'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bottle_Exchange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bottle_Exchange.init({
    // exchange_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    bottle_income: DataTypes.INTEGER,
    bottle_outcome: DataTypes.INTEGER,
    exchange_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Bottle_Exchange',
  });
  return Bottle_Exchange;
};