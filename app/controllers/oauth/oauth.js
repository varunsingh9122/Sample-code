const createError = require('http-errors');
const UserSchema = require('../../models/users/Users');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const {authSchema, authLoginSchema} = require('../../helpers/validation_schema')

const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require('../../helpers/jwt_helper')

module.exports = {

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
              const accessToken = await signAccessToken(user.id, user._role)
              const refreshToken = await signRefreshToken(user.id)
              console.log(accessToken)
        
              res.send({ accessToken, refreshToken })
            } catch (error) {
              console.log(error)
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
    }

}