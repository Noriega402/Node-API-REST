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

app.get('/home', (request, response) => {
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write("<h1>Home</h1>");
  console.log(request.url);
})

app.get('/products', (request, response) => {
  response.json(data);
})

app.listen(port, function(){
  console.log(`Escuchando en: localhost:${port}/`);
});
