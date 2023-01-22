let data = require('../examples/products.json');
const controller = {};

controller.getProducts = (request, response) => {
  const { size } = request.query;
  const getProducts = [];
  const limit = size || 10; //en caso no pasa un valor, se le asigna 10
  if(size){
    for(let i = 0; i < limit; i++){
      getProducts.push({
        id: data[i].id,
        product: data[i].product,
        price: data[i].price,
        description: data[i].description,
      });
    }

    response.json(getProducts);
  }else{
    response.json(data);
  }
}

controller.getPagination = (request, response, next) => {
  const { size } = request.query;
  const getProducts = [];
  const limit = size || 10; //en caso no pasa un valor, se le asigna 10
  if(limit){
    for(let i = 0; i < limit; i++){
      getProducts.push({
        id: data[i].id,
        product: data[i].product,
        price: data[i].price,
        description: data[i].description,
      });
    }

    response.json(getProducts);
  }else{
    response.json(data);
  }
}

controller.findProduct = (request, response) => { //recibe parametros
  const id = Number(request.params.id);
  const search = data.find(product => product.id == id);

  if(search){
    response.json(search);
  }else{
    response.status(404).end();
  }
}

controller.newProduct = (request, response) => {
  const body = request.body;
  const ids = data.map(datos => datos.id); //obtener los ids de los productos
  const maxId = Math.max(...ids); // verificar el id mayor

  const newProduct = {
    id: maxId + 1,
    products: body.products,
    price: body.price,
    description: body.description,
  }

  data = [...data, newProduct];
  response.json(newProduct);
}

controller.example = (request, response) => {
  const { categoryId, productId} = request.params;
  response.json({
    categoryId,
    productId
  });
}

module.exports = controller;
