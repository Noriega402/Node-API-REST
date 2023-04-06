'use strict';

const insertOrders = require('../data/insertOrdes');
const { ORDER_TABLE } = require('../models/order.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = insertOrders();
    await queryInterface.bulkInsert(ORDER_TABLE, orders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(ORDER_TABLE);
  }
};
