const express = require('express');
const passport = require('passport');
const productsRouter = require('./products.router');
const categorysRouter = require('./categorys.router');
const usersRouter = require('./users.router');
const loginRouter = require('./login.router');
const shoppingRouter = require('./shopping.router');
const testRouter = require('./test.router');
const orderRouter = require('./orders.router');
const customerRouter = require('./customers.router');
const authRouter = require('./auth.router');
const { logErrors, errorHandler, ormErrorHandler } = require('../middlewares/error.handler');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categorysRouter);
  router.use('/users', usersRouter);
  router.use('/login', loginRouter);
  router.use('/shopping', shoppingRouter);
  router.use('/orders', orderRouter);
  router.use('/test', testRouter);
  router.use('/customers', customerRouter);
  router.use('/auth', authRouter);
  app.use(logErrors); // errores comunes
  app.use(ormErrorHandler); //mostrar errores de sequelize ORM -> CRUD
  app.use(errorHandler); // errores de parte del servidor
}

module.exports = routerApi;
