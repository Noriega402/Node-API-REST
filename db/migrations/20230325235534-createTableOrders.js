'use strict';

const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { ORDER_TABLE } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      customerId: {
        field: 'customer_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
