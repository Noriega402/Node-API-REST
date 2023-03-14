const express = require('express');
const productsRouter = require('./products.router');
const categorysRouter = require('./categorys.router');
const usersRouter = require('./users.router');
const loginRouter = require('./login.router');
const shoppingRouter = require('./shopping.router');
const testRouter = require('./test.router');
const {logErrors, errorHandler, ormErrorHandler} = require('../middlewares/error.handler');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categorysRouter);
  router.use('/users', usersRouter);
  router.use('/login', loginRouter);
  router.use('/shopping', shoppingRouter);
  router.use('/test', testRouter);
  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(errorHandler);
}

module.exports = routerApi;
