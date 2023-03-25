const express = require('express');
const router = express.Router();
const validations = require('../schemas/category.schemas');
const controller = require('../controllers/category.controller');

router.get('/', controller.getAll); // listado categorias
router.get('/:id', controller.find); // ver categoria por ID
router.post('/', validations.validate(validations.createCategoryValidation, "body"), controller.create); //crear nueva categoria
router.patch('/:id', validations.validate(validations.updateCategoryValidation, "body"), controller.update); //actualizar categoria

router.delete('/:id', validations.validate(validations.deleteCategoryValidation, "params"), controller.delete); //eliminar categoria por ID

module.exports = router;