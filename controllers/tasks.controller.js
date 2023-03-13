const pool = require('../libs/postgres.pool');
const sequelize = require('../libs/sequelize');
const controller = {};

controller.getTasks = async (request, response) => {
    const query = 'SELECT *FROM tasks';
    pool.on('error', err => console.error(err));
    const getResult = await pool.query(query);
    return response.json(getResult.rows);
}

controller.getTasksSequelize = async (request, response) => {
    const query = 'SELECT *FROM tasks';
    const [data, metadata] = await sequelize.query(query);
    return response.json(data);
}

module.exports = controller;