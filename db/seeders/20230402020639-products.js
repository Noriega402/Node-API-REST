'use strict';

const { PRODUCT_TABLE } = require('../models/product.model');
const insertProducts = require('../data/inserts.products');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const inserts = insertProducts();
    await queryInterface.bulkInsert(PRODUCT_TABLE, inserts);
    // await true;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(PRODUCT_TABLE);
    // await true;
  }
};