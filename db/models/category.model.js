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
    },
    createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    }
};

class Category extends Model{
    static associate(models){
        this.hasMany(models.Product, { //relacion de uno a muchos
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