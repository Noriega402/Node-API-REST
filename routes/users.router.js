const express = require('express');
const data = require('../examples/users.json');
const router = express.Router();

//para acceder a la ruta es: localhost:3000/users?limit=10&offset=30
router.get('/', (request, response) => { //recibe querys
  const { size } = request.query;
  const test = [];
  const limit = size || 10;
  if(size){
    for(let i = 0; i < limit; i++){
      test.push({
        id: data[i].id,
        first_name: data[i].first_name,
        last_name: data[i].last_name,
        user_name: data[i].user_name,
        email: data[i].email,
        direction: data[i].direction,
        credit_card: data[i].credit_card,
      });
    }
    response.json(test);
  }else{
    response.send('nah');
  }
});

module.exports = router;
