const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'noriega',
    password: 'server2023$',
    database: 'store'
});

module.exports = pool;