const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../db/models/user.model');
const signToken = require('../utils/jwt/token.sign');
const { config } = require('../config/config');
const controller = {};

/**
 *
 * @param {*} request
 * @param {*} response responde con la consulta a la DB
 * @returns retorna en json solo los datos de la consulta realizada, si se requieren los metadatos agregarlos
 */
controller.getTasks = async (request, response) => {
  const query = 'SELECT *FROM tasks';
  const [data, metadata] = await sequelize.query(query);
  return response.json(data);
}


controller.getUsers = async (request, response, next) => { //recibe querys
  try {
    const users = await models.User.findAll({
      include: ['customer'], // traer datos asociados de customers
      attributes: { exclude: ['password'] }, //para no mostrar algun campo de la DB
    });

    return response.json(users);
  } catch (error) {
    next(error);
  }
}

controller.findUser = async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const find = await models.User.findByPk(id, {
      include: ['customer'],
      attributes: { exclude: ['password'] }
    });

    if (!find) {
      return response.json({ error: "Not Found", description: "User don´t exist in DB" })
    } else {
      return response.json(find);
    }
  } catch (error) {
    next(error);
  }
}

controller.findByEmail = async (request, response, next) => {
  try {
    // console.log(request.body);
    const body = request.body;
    if (body.message) {
      response.json(body);
    } else {
      const find = await models.User.findOne({
        where: {
          email: body.email
        }
      });

      if (!find) {
        response.json({ message: "No se encontro el usuario :(" });
      } else {
        const token = signToken(find, config.jwtSecret); //validar token
        delete find.dataValues.password;
        response.json({
          find,
          token
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

controller.create = async (request, response, next) => {
  try {
    const body = request.body
    const role = request.body.role;
    const passHash = await bcrypt.hash(body.password, 10); //hash de encriptacion

    let datos = {
      username: body.username,
      email: body.email,
      password: passHash,
    }

    if (body.role !== undefined) {
      datos = {
        ...datos,
        role: body.role,
      }
    }

    const newUser = await models.User.create(datos);
    response.json(newUser);

  } catch (err) {
    next(err);
  }
}

controller.deleteUser = async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const find = await models.User.findByPk(id);
    if (!find) {
      response.status(404).json({ statusCode: 404, error: "Not Found", "message": "User not found" });
    } else {
      const deleted = await find.destroy();
      response.json({ message: "Successfully deleted", description: "User successfully deleted" });
    }
  } catch (error) {
    next(error);
  }
}

controller.update = async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const body = request.body;
    let userUpdate = {
      username: body.user_name,
      email: body.email,
    };

    if (body.password !== undefined) {
      const passHash = await bcrypt.hash(body.password, 10);
      userUpdate = {
        username: body.user_name,
        email: body.email,
        password: passHash,
      }
    }

    if (body.role !== undefined) {
      userUpdate = {
        ...userUpdate,
        role: body.role,
      }
    }

    const user = await models.User.findByPk(id);
    if (!user) {
      return response.status(404).json({ statusCode: 404, error: "Not Found", message: "User not found" });
    }

    const updated = await user.update(userUpdate);
    return response.json(updated);
  } catch (error) {
    next(error);
  }
}

controller.compare = async (request, response) => {
  const { username, password } = request.params;
  const index = data.findIndex(user => user.user_name == username);
  if (index !== -1) {
    const compare = await bcrypt.compare(password, data[index].password);
    compare ? response.status(200).json(data[index]).end()
      : response.status(202).json({ error: "error de credenciales" });
  } else {
    response.status(404).sendFile(path.join(__dirname, '../public/404.html'));
  }
}

module.exports = controller;
