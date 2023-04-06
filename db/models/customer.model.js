const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },
    phone: {
        allowNull: true,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    }
}

class Customer extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' }) //realacion de tablas uno a uno
        this.hasMany(models.Order, { // relacion de uno a muchos (de customers a orders)
            as: 'orders', //alias para tabla de orders
            foreignKey: 'customerId',//customerId es por el nombre en el modelo de orders
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false,
        }
    }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };