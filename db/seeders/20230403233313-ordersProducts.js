'use strict';

const insertOrdersProducts = require('../data/inserts.orders.products');
const { ORDER_PRODUCT_TABLE } = require('../models/orderProduct.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const inserts = insertOrdersProducts();
    await queryInterface.bulkInsert(ORDER_PRODUCT_TABLE, inserts);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(ORDER_PRODUCT_TABLE);
  }
};
