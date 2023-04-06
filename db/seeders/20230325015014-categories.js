'use strict';

const { CATEGORY_TABLE } = require('../models/category.model');
const faker = require('faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(CATEGORY_TABLE, [
      {
        name: "Sports",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Home",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Videogames",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Entertainment",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Dairy",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Health",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Medicine",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Technology",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Home Appliances",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Garden",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Greengrocer",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Drinks",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Candies",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Food",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Software",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Baby",
        created_at: faker.date.between('2019-01-01', new Date()),
      },
      {
        name: "Books",
        created_at: faker.date.between('2019-01-01', new Date()),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
  }
};
