'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User);
      Order.belongsTo(models.Voucher);
      Order.belongsToMany(models.Item, {
        through: 'OrderDetail'
      });
    }
  }
  Order.init({
    total_price: DataTypes.INTEGER,
    payment: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    staff_name: DataTypes.STRING,
    shipping_address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};