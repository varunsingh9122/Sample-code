const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('@hapi/joi')
const {ParentMenu} = require('../../../seed/Enum')
const schema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  p_name :{
    type:String,
    required: true,
    enum : ParentMenu
  }
}, {
  timestamps: true
})

schema.index({ name: 'name'});

const Menu = mongoose.model('Menu', schema)
module.exports = Menu 