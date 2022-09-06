const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const schema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  }
})



const HomePage = mongoose.model('HomePage', schema)
module.exports = HomePage