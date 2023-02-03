const path = require('path');
const bcrypt = require('bcrypt');
const controller = {};
let data = require('../examples/users.json');

controller.getUsers = (request, response) => { //recibe querys
  const { size } = request.query;
  const test = [];
  const limit = size || 10;
  if (size) {
    for (let i = 0; i < limit; i++) {
      test.push({
        id: data[i].id,
        first_name: data[i].first_name,
        last_name: data[i].last_name,
        user_name: data[i].user_name,
        email: data[i].email,
        direction: data[i].direction,
        password: data[i].password,
      });
    }
    response.json(test);
  } else {
    response.json(data);
  }
}

controller.findUser = (request, response, next) => {
    const id = Number(request.params.id);
    const search = data.find(user => user.id == id);
    if (search) {
      response.json(search);
    }else{
      response.status(404).sendFile(path.join(__dirname,'../public/404.html'));
    }
}

controller.newUser = async (request, response) => {
  const body = request.body;
  const ids = data.map(datos => datos.id);
  const maxId = Math.max(...ids);
  const passHash = await bcrypt.hash(body.password,10); //hash de encriptacion

  const newUser = {
    id: maxId + 1,
    first_name: body.first_name,
    last_name: body.last_name,
    user_name: body.user_name,
    email: body.email,
    direction: body.direction,
    password: passHash
  }

  data = [...data, newUser];
  response.status(201).json(newUser);
}

controller.deleteUser = (request, response) => {
  const id = Number(request.params.id);
  const find = data.filter(item => item.id === id);
  // console.log(find.length);
  if (find.length !== 0) {
    data = data.filter(user => user.id !== id); //filtrar usuarios sin ese ID
    response.json(data);
  } else {
    response.status(404).sendFile(path.join(__dirname,'../public/404.html'));
  }
}

controller.update = async (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  const index = data.findIndex(item => item.id === id);
  let user;

  console.log(body.password);
  if (index !== -1) {

    if(body.password !== undefined){
      const passHash = await bcrypt.hash(body.password, 10);
      const dataUpdate = {...body, password: passHash};
      user = data[index];
      data[index] = {...user, ...dataUpdate};
    }else{
      user = data[index];
      data[index] = {...user, ...body};
    }

    response.status(202).json(data[index]);
  } else {
    response.status(404).sendFile(path.join(__dirname,'../public/404.html'));
  }
}

module.exports = controller;
