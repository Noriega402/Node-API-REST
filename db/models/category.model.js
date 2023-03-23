const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = "categories";

const CategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    }
};

class Category extends Model{
    static associate(models){
        this.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id',
        })
    }

    static config(sequelize){
        return{
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false,
        }
    }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };