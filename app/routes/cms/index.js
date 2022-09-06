var express = require('express');
var router = express.Router();
const app = express()

router.use('/menu',require('./menu'));
router.use('/home-pg',require('./homePage'));
router.use('/regEnquiry',require('./regEnquiry'));

module.exports = router;
