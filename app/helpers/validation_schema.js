const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
  fName : Joi.string().min(3).required(),
  mName : Joi.string().allow(''),
  lName : Joi.string().allow(''),
  contact : Joi.string().required().min(10).max(12),
  _role : Joi.required()
})


const authLoginSchema = Joi.object({
  email : Joi.string().required(),
  password : Joi.string().required()
})

const roleSchema = Joi.object({
  name : Joi.string().required(),
  description : Joi.string().required(),
  ability : Joi.object().allow("")
})

const customerSchema = Joi.object({
  name : Joi.string().required(),
  gender : Joi.string().required(),
  email : Joi.string().required(),
  contact : Joi.string().required(),
  dob : Joi.string().required(),
  address : Joi.string().required(),
  city : Joi.string().required(),
  state : Joi.string().required(),
  country : Joi.string().required(),
  zipcode : Joi.string().required(),
  _user : Joi.string()
})

const menuSchema = Joi.object({
  name : Joi.string().required(),
  pName : Joi.string().required(),

})

const homeContentSchema = Joi.object({
  description : Joi.string().required()
})

const RegEnquiry = Joi.object({
  name : Joi.string().required(),
  age : Joi.string().required(),
  contact : Joi.string().required(),
  email : Joi.string().required(),
  martialStatus : Joi.string().required(),
  addressLine1 : Joi.string().required(),
  addressLine2 : Joi.string().allow('', null),
  pincode : Joi.string().required(),
  refBy : Joi.string().allow('', null),
})
module.exports = {
  authSchema,
  authLoginSchema,
  customerSchema,
  roleSchema,
  menuSchema,
  homeContentSchema,
  RegEnquiry
}