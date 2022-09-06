var express = require('express');
var router = express.Router();
const app = express()
const UserController = require('../../controllers/UserController')
const permits = require('../../middleware/oauthorization');

router.get('/:id', permits('Admin'), UserController.getById);
router.get('/', permits('Admin'), UserController.getAll);
router.post('/', UserController.register)
module.exports = router;
