const express = require('express');
const controller = require('../controllers/shopping.controller');
const router = express.Router();

router.get('/', controller.index);
router.get('/:user_name', controller.addItem);

module.exports = router;
