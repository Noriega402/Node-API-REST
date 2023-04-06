const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = "products";

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10,2),
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    image: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
    categoryId: {
        field: 'category_id',
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            foreignKey: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
};

class Product extends Model{
    static associate(models){
        this.belongsTo(models.Category, { as: 'category'});
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false,
        }
    }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };