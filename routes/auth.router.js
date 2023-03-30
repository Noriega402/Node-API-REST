const express = require('express');
const passport = require('passport');
const moment = require('moment');
const router = express.Router();
const token = require('../utils/jwt/token.sign');
const controller = require('../controllers/users.controller');

router.post('/login',
    passport.authenticate('local', { session: false }),
    controller.findByEmail // dentro del cotroller se firma (crea) el token
);

module.exports = router;