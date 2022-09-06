var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/portal/UserController');

router.get('/', UserController.getAll)

module.exports = router;
