const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
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
    },
    ability : { 
      dashboard : {
        access : Boolean,
        get : Boolean,
        post : Boolean,
        patch : Boolean,
        delete : Boolean
      }
     }
})

  
const Role = mongoose.model('Role', RoleSchema)
module.exports = Role