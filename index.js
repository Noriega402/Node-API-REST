const express = require('express');
const path = require('path');
const routerApi = require('./routes');
const app = express(); //usando constante de express
const cors = require('cors');

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public'))); //ruta estatica

routerApi(app);

app.listen(process.env.PORT || PORT, function(){
  console.log(`Escuchando en: localhost:${PORT}/`);
});
