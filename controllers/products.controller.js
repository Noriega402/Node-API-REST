const root = { root: "C:\\Users\\HP INTEL\\Documents\\Cursos Platzi\\Node-API-REST\\public"};
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
    response.status(404).sendFile("/404.html", root);
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

controller.delete = (request, response) => {
  const id = Number(request.params.id);
  const index = data.findIndex(item => item.id === id);
  // console.log(data[index]);
  if(index !== -1){
    response.status(200).json(data[index]).end(); //mostrar producto eliminado
  }else{
    response.status(404).sendFile('/404.html', root);
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
    response.status(202).json(data[index]);
  }else{
    response.status(406).send("Error de solicutud...").end();
  }
}

module.exports = controller;
