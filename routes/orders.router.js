const express = require('express');
const validations = require('../schemas/order.schema');
const controller = require('../controllers/order.controller');
const router = express.Router();
const passport = require('passport');
const protectedJWT = passport.authenticate('jwt', { session: false });

router.get('/', controller.getAll); //traer ordenes de compra
router.get('/:id', validations.validate(validations.getOrderValidation,"params"), controller.find); // ver orden de compra
router.post('/', protectedJWT, validations.validate(validations.customerValidation, "body"), controller.new); //crear una nueva orden de compra
router.post('/add-product', validations.validate(validations.addItem, "body"), controller.addItem);
router.patch('/:id', protectedJWT, validations.validate(validations.idOrderValidation, "params"), validations.validate(validations.customerValidation, "body"), controller.update);
router.delete('/:id', protectedJWT, validations.validate(validations.idOrderValidation, "params"), controller.delete);

module.exports = router;