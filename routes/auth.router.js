const express = require('express');
const passport = require('passport');
const router = express.Router();
const validations = require('../schemas/auth.schema');
const controller = require('../controllers/auth.controller');

// loguearse a la app
router.post('/login',
    passport.authenticate('local', { session: false }), // autenticacion local
    controller.getUser // dentro del cotroller se firma (crea) el token
);

// recuperacion de password -> envia un email con token
router.post('/recovery',
    controller.sendRecovery, // dentro del cotroller se firma (crea) el token
);

// endpoint para cambiar el password
router.post('/reset-password',
    validations.validate(validations.newPasswordValidation, "body"),
    controller.resetPassword, // dentro del cotroller se firma (crea) el token
);

module.exports = router;