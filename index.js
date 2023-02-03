const express = require('express');
const path = require('path');
const routerApi = require('./routes');
const app = express(); //usando constante de express
const cors = require('cors');

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public'))); //ruta estatica

// definiendo rutas
// app.get('/', (request, response) => { //request = peticion  response = respuesta
//   response.writeHead(200,{'Content-Type':'text/html'});
//   response.write("<h1>Primer servidor con Express</h1>");
//   console.log(request.url);
//   console.log(path.join(__dirname,'\public'));
// });

routerApi(app);

app.listen(PORT, function(){
  console.log(`Escuchando en: localhost:${PORT}/`);
});
