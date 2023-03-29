const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = "orders";

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    customerId: {
        field: 'customer_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    total: { // calcular el valor de los productos (no se almacena dentro de la BD)
        type: DataTypes.VIRTUAL,
        get() {
            const items = this.getDataValue('items') || []; // asegura que items siempre es un arreglo
            if(items.length > 0){
                return items.reduce((total, item) => {
                    return total + (item.price * item.OrderProduct.quantity);
                }, 0);
            }
            return 0;
        }
    }
};

class Order extends Model{
    static associate(models){
        this.belongsTo(models.Customer, { //relacion de uno a muchos
            as: 'customer',
        });
        this.belongsToMany(models.Product, { //relacion de muchos a muchos
            as: 'items',
            through: models.OrderProduct, // referencia a la tabla donde hara la relacion muchos a muchos
            foreignKey: 'orderId', //referencia a campo de tabla orderProduct
            otherKey: 'productId', //referencia a campo de tabla orderProduct
        })
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false,
        }
    }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };