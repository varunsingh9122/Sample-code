var express = require('express');
var router = express.Router();
var RegEnquiryController = require('../../controllers/cms/RegEnquiryController');
const permits = require('../../middleware/oauthorization');

router.get('/', RegEnquiryController.GetAll)

router.post('/',permits('Admin'), RegEnquiryController.Create)

module.exports = router;
