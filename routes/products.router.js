const express = require('express');
const router = express.Router();
const validations = require('../schemas/product.schemas');
const controller = require('../controllers/products.controller');
const passport = require('passport');
const protectedJWT = passport.authenticate('jwt', { session: false });

router.get('/', validations.validate(validations.querysProduct, "query"), controller.getAll);
router.get('/pagination', controller.getPagination);
router.get('/:id', controller.find);

router.post('/', protectedJWT,
  validations.validate(validations.createProductValidation, "body"),
  controller.create
);

router.patch('/:id', protectedJWT,
  validations.validate(validations.updateProductValidation, "body"),
  controller.update
);

router.delete('/:id', protectedJWT,
  validations.validate(validations.deleteProductValidation, "params"),
  controller.delete
);

module.exports = router;
