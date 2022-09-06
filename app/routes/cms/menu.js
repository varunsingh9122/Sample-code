var express = require('express');
var router = express.Router();
var MenuController = require('../../controllers/cms/MenuController');
const permits = require('../../middleware/oauthorization');


router.post('/',permits('Admin'), MenuController.Create)

router.get('/:searchBy', MenuController.GetById)


module.exports = router;
