var express = require('express');
var router = express.Router();
const app = express()
var OauthController = require('../../controllers/oauthController');


router.post('/',OauthController.login);


module.exports = router;
