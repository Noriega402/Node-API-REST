'use strict';

const { DataTypes } = require('sequelize');
const {USER_TABLE, UserSchema} = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'role', {
      type: DataTypes.STRING,
      defaultValue: 'customer',
    }); // agregar columna
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};