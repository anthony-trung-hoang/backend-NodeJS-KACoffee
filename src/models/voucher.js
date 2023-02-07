'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.hasMany(models.Order, {
        foreignKey: 'voucher_id'
      })
    }
  }
  Voucher.init({
    // voucher_id: DataTypes.INTEGER,
    expired_date: DataTypes.DATE,
    value: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    voucher_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};