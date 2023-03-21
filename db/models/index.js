//se encarga de enviar la conexion hacia los modelos para hacer el mapeo de datos
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize)); //enviar un modelo de esquema y configuracion
    Customer.init(CustomerSchema, Customer.config(sequelize));

    Customer.associate(sequelize.models) //asociar tablas
}

module.exports = setupModels;