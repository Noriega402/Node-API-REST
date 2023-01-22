const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

router.get('/', controller.getProducts);
router.get('/pagination', controller.getPagination);
router.get('/:id', controller.findProduct);
router.get('/:categoryId/:productId', controller.example);


router.post('/', controller.newProduct);

module.exports = router;
