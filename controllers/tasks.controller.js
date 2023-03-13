const pool = require('../libs/postgres.pool');
const controller = {};

controller.getTasks = async (request, response) => {
    const query = 'SELECT *FROM tasks';
    pool.on('error', err => console.error(err));
    const getResult = await pool.query(query);
    return response.json(getResult.rows);
}

module.exports = controller;