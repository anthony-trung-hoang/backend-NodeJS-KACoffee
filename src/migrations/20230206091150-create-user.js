'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      user_password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.TINYINT
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue:1,
        values: ['1','2','3']
      },
      cart: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};