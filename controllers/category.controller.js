let data = require('../examples/categorys.json');
const path = require('path');
const controller = {};

controller.getAll = (request, response) => response.status(200).json(data).end();

controller.find = (request, response, next) => {
    const id = Number(request.params.id);
    const index = data.findIndex(category => category.id == id);
    index !== -1
        ? response.status(200).json(data[index]).end()
        : response.status(404).sendFile(path.join(__dirname,'../public/404.html'))
}

controller.new = (request, response, next) => {
    const body = request.body;
    const ids = data.map(id => datos.id);

    const maxId = Math.max(...ids);

    const newCategory = {
        id: maxId,
        category: body.category,
    }

    data = [...data, newCategory];
    response.status(202).json(newCategory).end();
}

controller.update = (request, response, next) => {
    const id = Number(request.params.id);
    const body = request.body;
    const index = data.findIndex(item => item.id === id);

    if(index !== -1){
        const category = data[index];
        data[index] = [...category, ...body];
        response.status(202).json({message: "Updated succesfully!"}).end();
    }else{
        response.status(404).json({message: "Bad request"}).end();
    }
}

controller.delete = (request, response, next) => {
    const id = Number(request.params.id);
    const index = data.findIndex(item => item.id === id);

    if(index !== -1){
        data.splice(index, 1);//otra forma de eliminar
        response.status(200).json({message: "Deleted succesfully!"}).end();
    }else{
        response.status(404).json({message: "Bad request"}).end();
    }
}

module.exports = controller;