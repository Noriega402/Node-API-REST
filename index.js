const express = require('express');
const faker = require('faker');
const data = require('./products.json');
const app = express(); //usando constante de express
const port = 3000;

// definiendo rutas
app.get('/', (request, response) => { //request = peticion  response = respuesta
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write("<h1>Login</h1>");
  // response.send("Este servidor es creado con express");
  console.log(request.url);
})

app.get('/home/:email/:name/:surname', (request, response) => {
  const { email, name, surname } = request.params;
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write(`<h1>Welcome ${name} ${surname}</h1>`);
  response.write(`<p>Your email is <strong>${email}</strong></p>`);
})

app.get('/products', (request, response) => {
  const  products = [];
  const { size } = request.query;
  const limit = size || 10;
  for(let i = 0; i < limit; i++){
    products.push({
      name: faker.commerce.product(),
      price: parseFloat(faker.commerce.price()),
      img: faker.image.image(),
    });
  }
  response.json(products);
  // response.json(data);
})

app.get('/products/:id', (request, response) => { //recibe parametros
  const { id } = request.params;
  response.json({
    id,
  });
})

app.get('/users', (request, response) => { //recibe querys
  const { limit , offset} = request.query;
  if(limit && offset){

    response.json({
      limit,
      offset,
    });

  }else{
    response.send('No hay querys...');
  }
})

app.get('/category/:categoryId/products/:productId', (request, response) => {
  const { categoryId, productId} = request.params;
  response.json({
    categoryId,
    productId
  });
})

app.get('/shop/:id/:user/home' , (request, response) => {
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
})

app.listen(port, function(){
  console.log(`Escuchando en: localhost:${port}/`);
});
