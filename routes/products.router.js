const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

router.get('/', controller.getProducts);
router.get('/pagination', controller.getPagination);
router.get('/:id', controller.findProduct);
router.post('/', controller.newProduct);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
