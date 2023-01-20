const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const loginRouter = require('./login.router');

function routerApi(app){
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/login', loginRouter);
}

module.exports = routerApi;
