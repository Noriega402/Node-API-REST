const controller = {};
let data = require('../examples/users.json');

controller.index = (request, response) => {
  response.writeHead(200,{'Content-Type':'text/html'});
  response.write(`<h1>Pagina de compras</h1>`);
}

controller.example = (request, response) => {
  const { user, id } = request.params;
  response.json({
    id,
    user,
    "cardShopping":[
      {
        "product":"Tomato",
        "price":8.56,
        "description":"Tomate maduro libra"
      },
      {
        "product":"Bananas",
        "price":1.92,
        "description":"Bananas de exportacion unidad"
      },
      {
        "product":"Leche Dos Pinos",
        "price":12.45,
        "description":"Litro de leche en caja"
      }
    ]
  });
}

controller.addItem = (request, response) => {
  const user_name = String(request.params.user_name); //transforma el parametro en String
  const search = data.find(data => data.user_name == user_name); //buscar persona por medio de user_name
  if(search){
    response.writeHead(200,{'Content-Type':'text/html'});
    response.write(`<h1>Aqui estaran tus compras ${search.first_name}</h1>`).end();
  }else{
    response.status(404).end();
  }
}

module.exports = controller;
