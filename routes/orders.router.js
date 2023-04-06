const express = require('express');
const validations = require('../schemas/order.schema');
const controller = require('../controllers/order.controller');
const router = express.Router();
const passport = require('passport');
const { checkAdminRole, checkRoles } = require('../middlewares/auth.handler');
const protectedJWT = passport.authenticate('jwt', { session: false });

router.get('/', controller.getAll); //traer ordenes de compra

router.get('/:id',
    validations.validate(validations.getOrderValidation,"params"),
    controller.find
); // ver orden de compra

// verifican que tengan token de autenticacion
router.post('/',
    protectedJWT,
    validations.validate(validations.customerValidation, "body"),
    controller.new
); //crear una nueva orden de compra

router.post('/add-product',
    protectedJWT,
    validations.validate(validations.addItem, "body"),
    controller.addItem
);

router.patch('/:id',
    protectedJWT,
    checkRoles('admin', 'customer'),
    validations.validate(validations.idOrderValidation, "params"),
    validations.validate(validations.customerValidation, "body"),
    controller.update
);

router.delete('/:id',
    protectedJWT,
    checkAdminRole, //rol que puede eliminar categorias
    validations.validate(validations.idOrderValidation, "params"),
    controller.delete
);

module.exports = router;