const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ParentMenu} = require('../../seed/constants')
const schema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  pName :{
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