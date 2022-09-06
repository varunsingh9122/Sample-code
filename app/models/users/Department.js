const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      length : 500
    }
  })

  
const Dept = mongoose.model('Department', schema)
module.exports = Dept