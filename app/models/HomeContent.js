const mongoose = require('mongoose')
const Schema = mongoose.Schema

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



const HomePage = mongoose.model('HomeContent', schema)
module.exports = HomePage