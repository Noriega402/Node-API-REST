const express = require('express');
const routerApi = require('./routes');
const app = express(); //usando constante de express
const PORT = 3000;

app.use(express.json());
// definiendo rutas
app.get('/', (request, response) => { //request = peticion  response = respuesta
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write("<h1>Primer servidor con Express</h1>");
  // console.log(request.url);
});

routerApi(app);

app.listen(PORT, function(){
  console.log(`Escuchando en: localhost:${PORT}/`);
});
