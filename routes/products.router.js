const express = require('express');
const router = express.Router();
const validations = require('../schemas/product.schemas');
const controller = require('../controllers/products.controller');
const passport = require('passport');
const { checkAdminRole, checkRoles } = require('../middlewares/auth.handler');
const protectedJWT = passport.authenticate('jwt', { session: false });

router.get('/pagination', controller.getPagination);

router.get('/:id', controller.find);

router.get('/',
  validations.validate(validations.querysProduct, "query"),
  controller.getAll
);

//Verifican que tengan token de autenticacion
router.post('/',
  protectedJWT,
  checkAdminRole, // roles que pueden crear productos
  validations.validate(validations.createProductValidation, "body"),
  controller.create
);

router.patch('/:id',
  protectedJWT,
  checkAdminRole, // roles que pueden crear productos
  validations.validate(validations.updateProductValidation, "body"),
  controller.update
);

router.delete('/:id',
  protectedJWT,
  checkAdminRole, // roles que pueden crear productos
  validations.validate(validations.deleteProductValidation, "params"),
  controller.delete
);

module.exports = router;
