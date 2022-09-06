var express = require('express');
var router = express.Router();
const app = express()

router.use('/oauth', require('./oauth'))
router.use('/user', require('./user'))
router.use('/cms',require('./cms'));
router.use('/',require('./portal'));


module.exports = router;
