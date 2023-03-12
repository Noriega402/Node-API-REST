const { Client } = require('pg');

async function getConnection(){
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'noriega',
        password: 'server2023$',
        database: 'store'
    });
    await client.connect();
    return client;
}

module.exports = getConnection;