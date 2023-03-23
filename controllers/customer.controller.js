const path = require('path');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const controller = {};

controller.getAll = async (request, response, next) => {
    const customers = await models.Customer.findAll({
        include: ['user'] //alias de tabla users
    });
    response.json(customers);
}

controller.find = async (request, response, next) => {
    const id = Number(request.params.id);
    const find = await models.Customer.findByPk(id);
    if (!find) return response.status(404).json({ statusCode: 404, error: "Not Found", description: "Customer not found" })
    else return response.status(200).json(find);
}

controller.new = async (request, response, next) => {
    try {
        const body = request.body;
        const { username, email ,password, role} = request.body.user;
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        let datos = {
            username,
            email,
            password: passwordHash
        };

        if (role !== undefined) {
            datos = {
                ...datos,
                role
            }
        }

        const newUser = await models.User.create(datos);
        const newCustomer = await models.Customer.create({
            ...body,
            userId: newUser.id,
        });

        const user = await models.User.findByPk(newUser.id);
        const customer = await models.Customer.findByPk(newCustomer.id);

        const res = {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            phone: customer.phone,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
            userId: user.id,
            createdAt: customer.createdAt,
        }

        response.json(res);
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