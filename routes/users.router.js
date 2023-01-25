const express = require('express');
const router = express.Router();
const validations = require('../schemas/user.schema');
const controller = require('../controllers/users.controller');

//para acceder a la ruta es: localhost:3000/users?limit=10&offset=30
router.get('/', controller.getUsers);
router.get('/:id', controller.findUser);
router.post('/', validations.validate(validations.createUserValidation), controller.newUser);
router.delete('/:id', controller.deleteUser);
router.patch('/:id', controller.update);

module.exports = router;
