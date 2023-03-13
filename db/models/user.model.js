const { Model, DataTypes, Sequelize } = require('sequelize');

// buena paractica para definir cual sera el nombre de nuestra tabla
const USER_TABLE = 'users';

//crear el esquema que queremos que haga la DB
const UserSchema = {
    id: {
        allowNull: false, //permitir que el campo sea o no nulo
        autoIncrement: true, //campo incrementable
        primaryKey: true, // llave primaria
        type: DataTypes.INTEGER, // que tipo de valor recibira
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true, //tipo de campo unico
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: { //
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at', //definir el nombre de la columna
        defaultValue: Sequelize.NOW //insertar fecha por fecto
    }
};

class User extends Model {
    static associate() {
        //models = definiendo todas las relaciones
    }

    static config(sequelize){
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }