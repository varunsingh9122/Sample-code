var express = require('express');
var router = express.Router();
var MenuController = require('../../controllers/MenuController');
const permits = require('../../middleware/oauthorization');


router.post('/',permits('Admin'), MenuController.Create);

router.get('/:searchBy', MenuController.GetById);

router.get('/', MenuController.GetAll);


module.exports = router;
