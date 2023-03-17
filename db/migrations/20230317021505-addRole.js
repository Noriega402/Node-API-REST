'use strict';

const {USER_TABLE, UserSchema} =require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role); // agregar columna
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};