'use strict';

const { DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
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
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
