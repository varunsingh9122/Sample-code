const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  age :{
    type:String,
    required: true,
  },
  contact :{
    type:String,
    required: true,
  },
  email :{
    type:String,
    required: true,
  },
  martialStatus :{
    type:String,
    required: true,
    enum : [
      "Single",
      "Married"
    ]
  },
  addressLine1 : {
    type:String,
    required: true,
  },
  addressLine2 : {
    type:String,
  },
  pincode : {
    type:String,
    required: true,
  },
  refBy : { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, {
  timestamps: true
})

schema.index({ name: 'name'});

const RegEnquiry = mongoose.model('RegEnquiry', schema)
module.exports = RegEnquiry 