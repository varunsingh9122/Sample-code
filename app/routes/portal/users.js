var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/UserController');
const permits = require('../../middleware/oauthorization');

router.get('/', permits('Admin'), UserController.getAll)

module.exports = router;
