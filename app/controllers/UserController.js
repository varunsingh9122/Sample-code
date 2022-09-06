const mongoose = require('mongoose');
const createError = require('http-errors')

const UserSchema = require('../models/Users');
const UserService = require('../services/userServices')
const {authSchema, authLoginSchema} = require('../helpers/validation_schema')

const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require('../helpers/jwt_helper')

module.exports = {
    getAll : async(req, res, next) => {
    UserSchema.find().then((data)=>{
        console.log("User response....", data)
        res.json({
            success : true,
            count : data.length,
            users : data
        })
    })
    .catch((err)=>{
        console.log("error", err)
        res.json({
            success : false,
            error : err
        })  
    })
    },
    getDsCount : async(req, res, next)=>{
      const agents = await UserSchema.find();
      res.json({
        success : true,
        totalAgents : agents.length
      })
    },
    getById : async(req, res, next) => {
      console.log("Fetching agent id", req.params.id)
      try{
        const agent = await UserSchema.findOne({_id : req.params.id});
      if(agent){
        const user = {
          name : agent.f_name +' '+ agent.l_name,
          email : agent.email,
          contact: agent.contact
        }
          res.json({
              success : true,
              user
          })
      }else{
          res.json({
              success : false,
              message : "Oops no record found of this ID."
          })
      }
      }catch(err){
        console.log(err)
        res.json(err)
      }

  },
  register : async(req, res, next) => {
      try{
        // const { email, password } = req.body
        // if (!email || !password) throw createError.BadRequest()
          const regFormat = {
            fName : req.body.fName,
            mName : req.body.mName ||'',
            lName : req.body.lName,
            email : req.body.email,
            password : req.body.password,
            contact : req.body.contact,
            _role : req.body._role
          }

          // Make sure this account doesn't already exist
          const result = await authSchema.validateAsync(regFormat);

          const doesExist = await UserSchema.findOne({
              email:result.email
          })
          if(doesExist){
              throw createError.Conflict(`${result.email} is already been registered`)
          }
          console.log("Pushing user to db", result)
          const user = new UserSchema(result)
          const savedUser = await user.save()
    
          res.json(
            { 
              success : true,
              message : "Agent Registered Successfully",
              user : user  
            }
          )
            // res.json("Registering user")
        }catch(error){
            if(error.isJoi === true) error.status =422
            next(error)
        }
    },

    login : async(req, res, next) => {
      console.log("Signin api called", req.body)
        try {

            const result = await authLoginSchema.validateAsync(req.body)
            console.log("Req validated", result)
            const user = await UserSchema.findOne({ email: result.email }).populate("_role")
            console.log(user)
            if (!user) throw createError.NotFound('User not registered')
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch)
              throw createError.Unauthorized('Username/password not valid')
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id)
            console.log(accessToken)
      
            res.send({ accessToken, refreshToken })
          } catch (error) {
            if (error.isJoi === true)
              return next(createError.BadRequest('Invalid Username/Password'))
            next(error)
          }
    },

    refreshToken: async (req, res, next) => {
        try {
          const { refreshToken } = req.body
          if (!refreshToken) throw createError.BadRequest()
          const userId = await verifyRefreshToken(refreshToken)
    
          const accessToken = await signAccessToken(userId)
          const refToken = await signRefreshToken(userId)
          res.send({ accessToken: accessToken, refreshToken: refToken })
        } catch (error) {
          next(error)
        }
    },
    
    logout: async (req, res, next) => {
      try {
          const { refreshToken } = req.body
          console.log("Refresh token", refreshToken);
          if (!refreshToken) throw createError.BadRequest()
          const userId = await verifyRefreshToken(refreshToken)
          console.log("user ID", userId)
          client.DEL(userId, (err, val) => {
          if (err) {
              console.log(err.message)
              throw createError.InternalServerError()
          }
          console.log(val)
          res.sendStatus(204)
          })
      } catch (error) {
          next(error)
      }
    },
}