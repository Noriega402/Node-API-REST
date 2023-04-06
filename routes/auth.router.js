const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/login',
    passport.authenticate('local', { session: false }), // autenticacion local
    controller.getUser // dentro del cotroller se firma (crea) el token
);

//recuperacion de password
router.post('/recovery',
    controller.sendMail // dentro del cotroller se firma (crea) el token
);

module.exports = router;