const { models } = require('../libs/sequelize');
const path = require('path');
const controller = {};

controller.find = async (request, response, next) => {
    try {
        const id = Number(request.params.id);
        const find = await models.Order.findByPk(id, {
            include: [
                {
                    association: 'customer',
                    include: ['user'],
                },
                'items'
            ],
        });
        if (!find) {
            response.json({ statusCode: 404, message: "Not Found", description: "Order not found" });
        } else {
            delete find.dataValues.customer.dataValues.user.dataValues.password;
            // console.log(find.dataValues.customer.dataValues.user.dataValues.password);
            response.json(find);
        }
    } catch (error) {
        next(error);
    }
}

controller.findByUser = async (request, response, next) => {
    try {
        const id = request.user.sub; // obtener ID del token

        const orders = await models.Order.findAll({
            where: { // consulta compleja
                '$customer.user.id$': id
            },
            include: [
                {
                    association: 'customer',
                    include: ['user'],
                },
            ],
        });
        // console.log(orders);
        // response.json(orders);
        if (!orders) {
            return response.json({ statusCode: 404, message: "Order not found" });
        }
        return response.json(orders);
    } catch (error) {
        next(error);
    }
}

controller.getAll = async (request, response, next) => {
    try {
        const orders = await models.Order.findAll({
            include: [
                { //ASOCIACION ANIDADA
                    association: 'customer',
                    include: ['user'],
                },
                'items'
            ]
        });
        // console.log(order.dataValues.customer.dataValues.user.dataValues.password);
        orders.forEach(order => {
            delete (order.dataValues.customer.dataValues.user.dataValues.password)
        })
        response.json(orders);
    } catch (error) {
        next(error);
    }
}

controller.new = async (request, response, next) => {
    try {
        const body = request.body;
        const created = await models.Order.create(body);
        // console.log(created);
        response.json(created);
    } catch (error) {
        next(error);
    }
}

controller.addItem = async (request, response, next) => {
    try {
        const body = request.body;
        const newItem = await models.OrderProduct.create(body);
        const find = await models.Order.findByPk(newItem.orderId, {
            include: [
                {
                    association: 'customer',
                    include: ['user'],
                },
                'items'
            ]
        });
        delete find.dataValues.customer.dataValues.user.dataValues.password;
        // console.log(find.dataValues.customer.dataValues.user.dataValues.password);
        response.json(find);
    } catch (error) {
        next(error);
    }
}

controller.update = async (request, response, next) => {
    try {
        const id = Number(request.params.id);
        const body = request.body;
        const updated = await models.Order.update(body, {
            where: {
                id: id,
            }
        })

        if (updated == 0) {
            response.json({ statusCode: 404, message: "Not found", description: "Order not found..." })
        } else {
            const find = await models.Order.findByPk(id, {
                include: [{ // ASOCIACION ANIDADA
                    association: 'customer',
                    include: ['user'],
                }],
            });
            delete (find.dataValues.customer.dataValues.user.dataValues.password) // ELIMINAR PASSWORD DE CONSULTA
            response.json(find);
        }
    } catch (error) {
        next(error);
    }
}

controller.delete = async (request, response, next) => {
    try {
        const id = Number(request.params.id);
        const find = await models.Order.findByPk(id);

        if (!find) {
            response.status(404).json({ statusCode: 404, error: "Not Found", "message": "Order not found" });
        } else {
            const deleted = await find.destroy();
            response.json({ message: "Successfully deleted", description: "Order successfully deleted" });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = controller;