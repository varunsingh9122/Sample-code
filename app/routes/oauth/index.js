var express = require('express');
var router = express.Router();
const app = express()
var OauthController = require('../../controllers/oauth/oauth');


router.post('/',OauthController.login);


module.exports = router;