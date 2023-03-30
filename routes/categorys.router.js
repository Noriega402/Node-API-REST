const express = require('express');
const router = express.Router();
const validations = require('../schemas/category.schemas');
const controller = require('../controllers/category.controller');
const passport = require('passport');
const protectedJWT = passport.authenticate('jwt', { session: false });

router.get('/', controller.getAll); // listado categorias
router.get('/:id', controller.find); // ver categoria por ID

router.post('/',
    protectedJWT,
    validations.validate(validations.createCategoryValidation, "body"),
    controller.create
);

router.patch('/:id', //actualizar categoria
    protectedJWT,
    validations.validate(validations.updateCategoryValidation, "body"),
    controller.update
);

router.delete('/:id', //eliminar categoria por ID
    protectedJWT,
    validations.validate(validations.deleteCategoryValidation, "params"),
    controller.delete
);

module.exports = router;