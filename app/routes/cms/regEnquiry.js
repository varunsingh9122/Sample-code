var express = require('express');
var router = express.Router();
var RegEnquiryController = require('../../controllers/RegEnquiryController');
const permits = require('../../middleware/oauthorization');

router.get('/', permits('Admin'), RegEnquiryController.GetAll)

router.post('/', RegEnquiryController.Create)

module.exports = router;
