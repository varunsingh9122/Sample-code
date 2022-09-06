var express = require('express');
var router = express.Router();
var HomePageController = require('../../controllers/cms/HomePageController');
const permits = require('../../middleware/oauthorization');

router.get('/', HomePageController.GetAll)

router.patch('/', permits('Admin'), HomePageController.UpdateOne);

module.exports = router;
