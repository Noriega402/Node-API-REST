const path = require('path');
let data = require('../examples/products.json');
const controller = {};

controller.getAll = (request, response) => {
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

controller.find = (request, response) => { //recibe parametros
  const id = Number(request.params.id);
  const search = data.find(product => product.id == id);

  search
    ? response.json(search)
    : response.status(404).sendFile(path.join(__dirname,'../public/404.html'))
}

controller.new = (request, response) => {
  const body = request.body;
  const ids = data.map(datos => datos.id); //obtener los ids de los productos
  const maxId = Math.max(...ids); // verificar el id mayor

  const newProduct = {
    id: maxId + 1,
    products: body.products,
    price: body.price,
    description: body.description,
    image: body.image
  }

  data = [...data, newProduct];
  response.status(202).json(newProduct).end();
}

controller.delete = (request, response) => {
  const id = Number(request.params.id);
  const index = data.findIndex(item => item.id === id);
  // console.log(data[index]);
  if(index !== -1){
    data.splice(index, 1);
    response.status(200).json({message: "Deleted successfully!"}).end(); //mostrar producto eliminado
  }else{
    response.status(404).json({message: "Bad request"}).end();
  }
}

controller.update= (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  const index = data.findIndex(item => item.id === id);
  // console.log(body);
  if(index !== -1){
    const product = data[index];
    data[index] = { ...product, ...body };
    response.status(202).json({message: "Updated succesfully!"}).end();
  }else{
    response.status(406).json({error: "Bad request"}).end();
  }
}

module.exports = controller;
