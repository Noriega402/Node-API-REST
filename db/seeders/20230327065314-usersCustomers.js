'use strict';

const createUsers = require('../data/create-users-customers');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { USER_TABLE, User } = require('../models/user.model');
// const { User, Customer } = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersAndCustomers = await createUsers();
    const users = usersAndCustomers.flatMap(({ user }) => user);
    const customers = usersAndCustomers.flatMap(({ customer }) => customer);

    await queryInterface.bulkInsert(USER_TABLE, users);
    await queryInterface.bulkInsert(CUSTOMER_TABLE, customers);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(CUSTOMER_TABLE, { where: {} });
    await queryInterface.bulkDelete(USER_TABLE, { where: {} });
  }
};
