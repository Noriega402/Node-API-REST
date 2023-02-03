const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const loginRouter = require('./login.router');
const shoppingRouter = require('./shopping.router');
const testRouter = require('./test.router');

const root = {root: "C:\\Users\\HP INTEL\\Documents\\Cursos Platzi\\Node-API-REST\\public"};

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/login', loginRouter);
  router.use('/shopping', shoppingRouter);
  router.use('/test', testRouter);
  app.use((error, request, response, next) => {
    // response.status(404).sendFile('/404.html', root);
    response.json({
      status: 404,
      error: error.message,
      path: error.path,
    })
  });
}

module.exports = routerApi;
