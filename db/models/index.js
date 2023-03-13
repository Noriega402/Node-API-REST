//se encarga de enviar la conexion hacia los modelos para hacer el mapeo de datos
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize)); //enviar un modelo de esquema y configuracion
}

module.exports = setupModels;