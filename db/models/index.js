//se encarga de enviar la conexion hacia los modelos para hacer el mapeo de datos
const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema} = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./orderProduct.model');

function setupModels(sequelize){
    // ENVIAR MODELOS DE ESQUEMA Y CONFIGURACION
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));
    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));


    //ASOCIAR TABLAS CON LOS OTROS MODELOS
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
    Order.associate(sequelize.models);
    OrderProduct.associate(sequelize.models);
}

module.exports = setupModels;