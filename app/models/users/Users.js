const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const {UserRole} = require('../../../seed/Enum')

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  f_name : {
    type: String,
    required: true,
  }, 
  m_name : {
    type: String
  }, 
  l_name : {
    type: String,
    required: true,
  }, 
  contact : {
    type:String,
    require : true
  },
  _role : { 
    type: String,
    enum : UserRole 
    // ['Admin', 'Team', 'User']
  }

})

UserSchema.pre('save', async function (next) {
  try {
    /* 
    Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
    */
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const User = mongoose.model('User', UserSchema)
module.exports = User