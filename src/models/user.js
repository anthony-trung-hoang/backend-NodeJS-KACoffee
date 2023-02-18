'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        foreignKey: 'user_id'
      });
    }
  }
  User.init({
    // user_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.BOOLEAN,
    role: DataTypes.INTEGER,
    cart: DataTypes.STRING,
    rank: DataTypes.INTEGER,
    totalMoneyHistory: DataTypes.INTEGER,
    //rank 1 100000-200000
    //rank 2 200000-500000
    //rank 3 500000-1000000
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};