const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const loginRouter = require('./login.router');
const shoppingRouter = require('./shopping.router');

let root = {root: "C:\\Users\\HP INTEL\\Documents\\Cursos Platzi\\Node-API-REST\\public"};

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/login', loginRouter);
  router.use('/shopping', shoppingRouter);
  app.use((request, response, next) => {
    response.status(404).sendFile('/404.html', root);
  })
}

module.exports = routerApi;
