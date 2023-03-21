const path = require('path');
const { models } = require('../libs/sequelize');
const controller = {};

controller.getAll = async (request, response, next) => {
    const customers = await models.Customer.findAll();
    response.json(customers);
}

controller.find = async (request, response, next) => {
    const id = Number(request.params.id);
    const find = await models.Customer.findByPk(id);
    if(!find) return response.status(404).json({statusCode: 404, error: "Not Found", description: "Customer not found"})
    else return response.status(200).json(find);
}

controller.new = async (request, response, next) => {
    try {
        const body = request.body;
        console.log(body);

        const created = await models.Customer.create(body);

        response.json(created);
    } catch (error) {
        next(error);
    }
}

controller.update = async (request, response, next) => {
    try {
        const id = Number(request.params.id);
        const body = request.body;
        const find = await models.Customer.findByPk(id);

        if (!find) {
            return response.status(404).json(find);
        }

        const updated = await find.update(body);
        response.status(200).json(updated);
    } catch (error) {
        next(error);
    }


}

controller.delete = async (request, response, next) => {
    const id = Number(request.params.id);
    const find = await models.Customer.findByPk(id);
    if (!find) {
        return response.status(404).json({ statusCode: 404, error: "Not Found", description: "Customer not found" });
    }

    const deleted = await find.destroy();
    response.status(200).json(deleted);
}


module.exports = controller;