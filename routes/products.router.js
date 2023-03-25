const express = require('express');
const router = express.Router();
const validations = require('../schemas/product.schemas');
const controller = require('../controllers/products.controller');

router.get('/', controller.getAll);
router.get('/pagination', controller.getPagination);
router.get('/:id', controller.find);

  router.post('/',
  validations.validate(validations.createProductValidation, "body"),
  controller.create);

  router.patch('/:id',
  validations.validate(validations.updateProductValidation, "body"),
  controller.update);

  router.delete('/:id',
  validations.validate(validations.deleteProductValidation, "params"),
  controller.delete);

module.exports = router;
