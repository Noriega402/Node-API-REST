'use strict';

const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false, //permitir que el campo sea o no nulo
        autoIncrement: true, //campo incrementable
        primaryKey: true, // llave primaria
        type: DataTypes.INTEGER, // que tipo de valor recibira
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true, //tipo de campo unico
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'customer',
      },
      recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at', //definir el nombre de la columna
        defaultValue: Sequelize.NOW //insertar fecha por fecto
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
