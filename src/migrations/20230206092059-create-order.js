'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      payment: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue : 1,
        values: [1,2,3,4]
        },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        values: [1,-1,0]
      },
      staff_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shipping_address: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      },
      voucher_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vouchers',
          key: 'id'
        },
        allowNull: false
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
    await queryInterface.dropTable('Orders');
  }
};