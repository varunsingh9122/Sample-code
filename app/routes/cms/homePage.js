var express = require('express');
var router = express.Router();
var HomeContentController = require('../../controllers/HomeContentController');
const permits = require('../../middleware/oauthorization');

router.get('/', HomeContentController.GetAll)

router.patch('/', permits('Admin'), HomeContentController.UpdateOne);

module.exports = router;
