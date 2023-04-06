const express = require('express');
const router = express.Router();
const validations = require('../schemas/category.schemas');
const controller = require('../controllers/category.controller');
const passport = require('passport');
const { checkAdminRole, checkRoles } = require('../middlewares/auth.handler');
const protectedJWT = passport.authenticate('jwt', { session: false });

router.get('/', controller.getAll); // ver categoria por ID

router.get('/:id',
    validations.validate(validations.isNumber, "params"),
    controller.find
); // listado categorias

router.post('/',
    protectedJWT,
    checkRoles('admin','seller'), // roles que pueden crear categorias
    validations.validate(validations.createCategoryValidation, "body"),
    controller.create
);

router.patch('/:id', //actualizar categoria
    protectedJWT,
    checkAdminRole,//roles que pueden actualizar categorias
    validations.validate(validations.updateCategoryValidation, "body"),
    controller.update
);

router.delete('/:id', //eliminar categoria por ID
    protectedJWT,
    checkAdminRole, //roles que pueden eliminar categorias
    validations.validate(validations.deleteCategoryValidation, "params"),
    controller.delete
);

module.exports = router;