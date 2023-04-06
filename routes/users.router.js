const express = require('express');
const router = express.Router();
const validations = require('../schemas/user.schema');
const controller = require('../controllers/users.controller');
const passport = require('passport');
const protectedJWT = passport.authenticate('jwt', { session: false });

router.get('/', controller.getUsers);

router.get('/tasks', controller.getTasks);

router.get('/:id', controller.findUser);

router.get('/:username/:password', controller.compare);

//Verifican que tengan token de autenticacion
router.post('/',
  // protectedJWT,
  validations.validate(validations.createUserValidation, "body"),
  controller.create
);

router.patch('/:id',
  protectedJWT,
  validations.validate(validations.updateUserValidation, "body"),
  controller.update
);

router.delete('/:id',
  protectedJWT,
  validations.validate(validations.deleteUserValidation, "params"),
  controller.deleteUser
);

module.exports = router;
