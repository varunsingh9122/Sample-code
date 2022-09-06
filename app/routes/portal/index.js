var express = require('express');
var router = express.Router();
const app = express()

router.use('/users',require('./users'));

module.exports = router;
