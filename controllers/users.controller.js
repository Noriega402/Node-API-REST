const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');
let data = require('../examples/users.json');
const path = require('path');
const bcrypt = require('bcrypt');
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
  const { size } = request.query;
  const datos = [];
  const limit = size || 10;

  const rows = await models.User.findAll();
  return response.json(rows);
}

controller.findUser = async (request, response, next) => {
  const id = Number(request.params.id);

  const find = await models.User.findByPk(id);
  if (!find) {
    return response.json({ error: "Not Found", description: "User don´t exist in DB" })
  } else {
    return response.json(find);
  }
}

controller.newUser = async (request, response, next) => {
  try {
    const body = request.body;
    const passHash = await bcrypt.hash(body.password, 10); //hash de encriptacion

    const datos = {
      username: body.user_name,
      email: body.email,
      password: passHash,
    };

    const newUser = await models.User.create(datos);
    //console.log(newUser);
    response.json(newUser);
  } catch (err) {
    next(err);
  }
}

controller.deleteUser = async (request, response) => {
  const id = Number(request.params.id);
  // const find = await models.User.findByPk(id);
  const find = await models.User.findByPk(id);
  if (!find) {
    return response.status(404).json({ statusCode: 404, error: "Not Found", "message": "User not found" });
  }
  const deleted = await find.destroy();

  return response.json(find);
}

controller.update = async (request, response) => {
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

  const user = await models.User.findByPk(id);
  if (!user) {
    return response.status(404).json({ statusCode: 404, error: "Not Found", "message": "User not found" });
  }

  const updated = await user.update(userUpdate);
  return response.json(updated);
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
