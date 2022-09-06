var express = require('express');
var router = express.Router();
const app = express()
const UserController = require('../../controllers/portal/UserController')

router.get('/:id', UserController.getById)

module.exports = router;
