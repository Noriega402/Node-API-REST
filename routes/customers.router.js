const express = require('express');
const router = express.Router();
const validations = require('../schemas/customer.schema');
const controller = require('../controllers/customer.controller');
const passport = require('passport');
const protectedJWT = passport.authenticate('jwt', { session: false });

router.get('/', controller.getAll);
router.get('/:id', validations.validate(validations.findCustomerValidation, "params"), controller.find);

router.post('/',
    protectedJWT,
    validations.validate(validations.newCustomerValidation, "body"),
    controller.new
);

router.patch('/:id',
    protectedJWT,
    validations.validate(validations.updateCustomerValidation, "body"),
    controller.update
);

router.delete('/:id',
    protectedJWT,
    validations.validate(validations.deleteCustomerValidation, "params"),
    controller.delete
);

module.exports = router;