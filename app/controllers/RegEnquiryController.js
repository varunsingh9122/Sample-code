const mongoose = require('mongoose');
const createError = require('http-errors')

const RegEnquirySchema = require('../models/regEnquiry');
const { RegEnquiry } = require('../helpers/validation_schema');
const User = require('../models/Users');

module.exports = {
    GetAll : (req, res, next) => {
        console.log(req.body);
        
        RegEnquirySchema.find().then((reg)=>{
            res.json(
                {
                    success: true,
                    count : reg.length,
                    reg
                }
            )
        })
        .catch((err)=>{
            res.json({
                success : false,
                err
            })
        })
    },
    Create : async (req, res, next) => {
        console.log(req.body);
        try{
            const result = await RegEnquiry.validateAsync(req.body);
            console.log("Validating reg enquiry data", result);
            const doesExist = await RegEnquirySchema.findOne({$or : [{email : req.body.email}, {contact : req.body.contact}]})

            if(doesExist) throw createError.Conflict(`${result.name} already exists`);
            const newUser = new RegEnquirySchema(result);
            const savedUser = await newUser.save();
            console.log("User saved Successfully..");
            res.json({
                success: true,
                savedUser
            })
        }catch(err){
            res.json(
                err
            )
        }
    },
}