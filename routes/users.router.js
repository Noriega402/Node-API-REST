const express = require('express');
const controller = require('../controllers/users.controller');
const router = express.Router();

//para acceder a la ruta es: localhost:3000/users?limit=10&offset=30
router.get('/', controller.getUsers);
router.get('/:id', controller.findUser);

router.post('/', controller.newUser);

router.delete('/:id', controller.deleteUser);

router.patch('/:id', controller.update);

module.exports = router;
