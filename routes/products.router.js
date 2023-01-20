const express = require('express');
const data = require('../examples/products.json');
const router = express.Router();

router.get('/', (request, response) => {
  const { size } = request.query;
  const limit = size || 10; //en caso no pasa un valor, se le asigna 10
  // const  products = [];
  // for(let i = 0; i < limit; i++){
  //   products.push({
  //     name: faker.commerce.product(),
  //     price: parseFloat(faker.commerce.price()),
  //     img: faker.image.image(),
  //   });
  // }
  // response.json(products);
  response.json(data); //para usar en lugar de faker
})

router.get('/:id', (request, response) => { //recibe parametros
  const { id } = request.params;
  response.json({
    id,
  });
})

router.get('/:categoryId/:productId', (request, response) => {
  const { categoryId, productId} = request.params;
  response.json({
    categoryId,
    productId
  });
})

router.get('/:id/:user' , (request, response) => {
  const { user, id } = request.params;
  response.json({
    id,
    user,
    "cardShopping":[
      {
        "product":"Tomato",
        "price":8.56,
        "description":"Tomate maduro libra"
      },
      {
        "product":"Bananas",
        "price":1.92,
        "description":"Bananas de exportacion unidad"
      },
      {
        "product":"Leche Dos Pinos",
        "price":12.45,
        "description":"Litro de leche en caja"
      }
    ]
  });
});

module.exports = router;
