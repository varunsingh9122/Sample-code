var express = require('express');
var morgan = require('morgan')
var createError = require('http-errors')
const helmet = require("helmet");
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cors = require('cors');
const { PassThrough } = require('stream')

var app = express();
// app.disable('x-powered-by')
// app.use(helmet());
app.use(morgan('dev'))
require('./app/helpers/init_mongodb')
require('./app/helpers/init_redis')
// const client = require('./app/helpers/init_redis')
const SeedData = require('./seed/UserSeed');
SeedData.AdminUser();

app.use(cors());

//Implementing cors
app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth');
    if(req.method=='OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.statusCode(200).json({});
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

// app.use('/api/v1/users', users);
app.use('/api/v1', require('./app/routes'))

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
        status: err.status || 500,
        message: err.message,
        },
    })
})

module.exports = app;