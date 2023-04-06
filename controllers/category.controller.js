const { models } = require('../libs/sequelize');
const path = require('path');
const controller = {};

//traer solo las categorias
controller.getAll = async (request, response) => {
    const categories = await models.Category.findAll();
    response.json(categories);
}

//ver una categoria con todos los productos
controller.find = async (request, response, next) => {
    try {
        const id = Number(request.params.id);
        const category = await models.Category.findByPk(id, {
            include: ['products'],
        });
        if(!category) return response.json({statusCode: 404, error: "Not found", message: "Category not found"});
        return response.json(category);
    } catch (error) {
        next(error);
    }
}


controller.create = async (request, response, next) => {
    try {
        const body = request.body;
        const newCategory = await models.Category.create(body);
        response.json(newCategory);
    } catch (error) {
        next(error);
    }
}

controller.update = async (request, response, next) => {
    try {
        const id = Number(request.params.id);
        const body = request.body;
        console.log(body);
        const category = await models.Category.findByPk(id);

        if (!category) {
            response.status(404).json({ statusCode: 404, error: "Not Found", message: "Category not found" })
        }

        const updated = await category.update(body);
        response.json(updated);
    } catch (error) {
        next(error)
    }
}

controller.delete = async (request, response, next) => {
    try {
        const id = Number(request.params.id);
        const find = await models.Category.findByPk(id);
        if (!find) {
            return response.status(404).json({ statusCode: 404, error: "Not Found", "message": "Category not found" });
        }
        const updateProductCategory = await models.Product.update({categoryId: null}, {
            where:{
                categoryId: id
            }
        })
        const deleted = await find.destroy();
        response.json({ message: "Deleted Successfuly!", description: "Category deleted" });
    } catch (error) {
        next(error);
    }
}

module.exports = controller;