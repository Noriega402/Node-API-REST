const express = require('express');
const data = require('../examples/products.json');
const router = express.Router();

router.get('/', (request, response) => {
  const { size } = request.query;
  const getProducts = [];
  const limit = size || 10; //en caso no pasa un valor, se le asigna 10
  if(size){
    for(let i = 0; i < limit; i++){
      getProducts.push({
        id: data[i].id,
        product: data[i].product,
        price: data[i].price,
        description: data[i].description,
      });
    }

    response.json(getProducts);
  }else{
    response.json(data);
  }
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


router.post('/', (request, response) => {
  const body = request.body;
  response.json({
    "message": "created successfuly",
  });
});

module.exports = router;
