'use strict';

const { DataTypes } = require('sequelize');
const { ORDER_TABLE } = require('../models/order.model');
const { ORDER_PRODUCT_TABLE } = require('../models/orderProduct.model');
const { PRODUCT_TABLE } = require('../models/product.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      productId: {
        field: 'product_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: PRODUCT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      orderId: {
        field: 'order_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: ORDER_TABLE,
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
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
