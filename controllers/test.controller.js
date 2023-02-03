// let data = require('../examples/test.json');
const faker = require('faker');
const bcrypt = require('bcrypt');
const root = { root: "C:\\Users\\HP INTEL\\Documents\\Cursos Platzi\\Node-API-REST\\public" };
const controller = {};
let data = []

controller.getAll = async (request, response) => {
  const { size } = request.query;
  const arr = [];
  const limit = size || 5;
  let encriptado;



  if (size) {
    response.json(arr);
  } else {
    for (let i = 0; i < limit; i++) {
      let pass = faker.internet.password();
      encriptado = await bcrypt.hash(pass, 10)
          data.push({
            id: i + 1,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            user_name: faker.internet.userName(),
            email: faker.internet.email(),
            direction: faker.address.direction(),
            password: pass,
            encriptador: encriptado,
          });
    }
    console.log(data);
    response.json(data).end();
  }
}

function password(dato) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(dato, 10, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    })
  });
}
module.exports = controller;
