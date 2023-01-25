const express = require('express');
const router = express.Router();
const validations = require('../schemas/product.schemas');
const controller = require('../controllers/products.controller');

router.get('/', controller.getProducts);
router.get('/pagination', controller.getPagination);
router.get('/:id', controller.findProduct);
router.post('/', validations.validate(validations.createProductValidation), controller.newProduct);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
