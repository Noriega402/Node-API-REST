const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/users.controller');

router.post('/login',
    passport.authenticate('local', { session: false }), // autenticacion local
    controller.findByEmail // dentro del cotroller se firma (crea) el token
);

module.exports = router;