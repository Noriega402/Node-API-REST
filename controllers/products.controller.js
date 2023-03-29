const path = require('path');
const { Op } = require('sequelize');
const { Product } = require('../db/models/product.model');
const { models } = require('../libs/sequelize');
const controller = {};

controller.getAll = async (request, response, next) => {
  try {
    const { limit, offset, product, price, price_min, price_max } = request.query;
    const options = {
      attributes: { exclude: ['category_id'] },
      include: ['category']
    }

    if (limit) {
      options.limit = limit;
    }

    if (offset) {
      options.offset = offset;
    }

    if (product) {
      options.where = {
        name: {
          [Op.iLike]: `%${product}%`,
        }
      }
    }

    if(price){
      parseInt(price);
      options.where = {
        price: {
          [Op.eq]: price,
        }
      }
    }else if(price_min && price_max){
      parseInt(price_min);
      parseInt(price_max);
      options.where = {
        price: {
          [Op.between]: [price_min, price_max],
        }
      }
    }

    const products = await models.Product.findAll(options);
    response.json(products);
  } catch (error) {
    next(error);
  }
}

controller.getPagination = (request, response, next) => {
  try {
    const { size } = request.query;
    const getProducts = [];
    const limit = size || 10; //en caso no pasa un valor, se le asigna 10
    if (limit) {
      for (let i = 0; i < limit; i++) {
        getProducts.push({
          id: data[i].id,
          product: data[i].product,
          price: data[i].price,
          description: data[i].description,
        });
      }

      response.json(getProducts);
    } else {
      response.json(data);
    }
  } catch (error) {
    next(error);
  }
}

controller.find = async (request, response, next) => { //recibe parametros
  try {
    const id = Number(request.params.id);
    const findProduct = await models.Product.findByPk(id, {
      attributes: { exclude: ['category_id'] },
      include: ['category'],
    });

    if (!findProduct) response.json({ statusCode: 404, message: "Not found", description: "Product not found" });
    else response.json(findProduct);
  } catch (error) {
    next(error)
  }
}

controller.create = async (request, response, next) => {
  try {
    const body = request.body;
    const newProduct = await models.Product.create(body)

    const product = await models.Product.findByPk(newProduct.id, {
      attributes: { exclude: ['category_id'] }
    });
    const category = await models.Category.findByPk(product.categoryId);
    const res = {
      ...product.dataValues,
      category: {
        ...category.dataValues
      }
    }
    response.json(res);
  } catch (error) {
    next(error);
  }
}

controller.delete = async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const find = await models.Product.findByPk(id);

    if (!find) {
      response.json({ statusCode: 404, message: "Not found", description: "Product not found..." })
    } else {
      const deleted = await find.destroy();
      response.json({ message: "Successfully Deleted", description: "Product deleted" });
    }
  } catch (error) {
    next(error)
  }
}

controller.update = async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const body = request.body;
    const updated = await Product.update(body, {
      where: { id: id },
    })

    if (updated == 0) {//error al actualizar
      response.json({ statusCode: 404, message: "Not found", description: "Product not found..." })
    } else {
      const find = await models.Product.findByPk(id, {
        attributes: { exclude: ['category_id'] },
        include: ['category'],
      });
      response.json(find);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = controller;
