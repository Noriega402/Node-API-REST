const express = require('express');
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
  response.json(data);
})

app.get('/products/:id', (request, response) => {
  const { id } = request.params;
  response.json({
    id,
  });
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
