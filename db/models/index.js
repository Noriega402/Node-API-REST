//se encarga de enviar la conexion hacia los modelos para hacer el mapeo de datos
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema} = require('./category.model');
const { Product, ProductSchema } = require('./product.model');

function setupModels(sequelize){
    User.init(UserSchema, User.config(sequelize)); //enviar un modelo de esquema y configuracion
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));

    User.associate(sequelize.models);
    Customer.associate(sequelize.models); //asociar tablas
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
}

module.exports = setupModels;