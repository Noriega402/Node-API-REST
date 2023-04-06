const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/order.controller');

router.get('/orders',
    passport.authenticate('jwt', { session: false }), //validar por token
    controller.findByUser // dentro del cotroller se firma (crea) el token
);

module.exports = router;