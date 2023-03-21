const express = require('express');
const router = express.Router();
const validations = require('../schemas/customer.schema');
const controller = require('../controllers/customer.controller');

router.get('/', controller.getAll);
router.get('/:id', validations.validate(validations.findCustomerValidation, "params"), controller.find);

router.post('/', validations.validate(validations.newCustomerValidation, "body"), controller.new);

router.patch('/:id', validations.validate(validations.updateCustomerValidation, "body"), controller.update);

router.delete('/:id', validations.validate(validations.deleteCustomerValidation, "params"), controller.delete)

module.exports = router;