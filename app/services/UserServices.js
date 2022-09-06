const mongoose = require('mongoose');
const User = require('../models/Users');

module.exports.GetAll = function (callback){
    User.find(callback)
}

module.exports.Add = function (data, callback){
    data.save(callback)
}