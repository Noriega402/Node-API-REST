const { Sequelize }= require('sequelize');
const { config } =  require('../config/config');
const setupModels =  require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

/**
 * @logging hay dos opciones true o false, en caso de dar un error colocar console.log
 * @dialect indicar a que DB nos vamos a conectar
 */
const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: console.log,
});

setupModels(sequelize); //enviando conexion

// hacer una sincronizacion de las comlumnas de las tablas
//sequelize.sync();

module.exports = sequelize;