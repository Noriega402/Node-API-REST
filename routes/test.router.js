const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasks.controller');

router.get('/', controller.getTasks);
router.get('/sequelize', controller.getTasksSequelize);

module.exports = router;
