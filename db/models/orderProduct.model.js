const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = "orders_products";

const OrderProductSchema = {
    id : {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity:{
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    productId: {
        field: 'product_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PRODUCT_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    orderId: {
        field: 'order_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ORDER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    subtotal: {
        allowNull: false,
        type: DataTypes.DECIMAL(10,2)
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
}

class OrderProduct extends Model {
    static associate(models){

    }

    static config(sequelize){
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false,
        }
    }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct};