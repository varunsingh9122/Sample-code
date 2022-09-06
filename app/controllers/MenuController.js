const mongoose = require('mongoose');
const createError = require('http-errors')

const MenuSchema = require('../models/menu');
const { menuSchema } = require('../helpers/validation_schema');
const {ParentMenu} = require('../../seed/constants')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    GetById : (req, res, next) => {
        let id = req.params.searchBy;
        const queryByName = {
            p_name : req.params.searchBy
        };
        var queryById =null;

        if(mongoose.Types.ObjectId.isValid(req.params.searchBy)){
            // console.log("Is a valid object id")
           queryById ={
               _id : mongoose.Types.ObjectId(req.params.searchBy)
           }
        }else{
            queryById ={
                _id :null
            }
        } 

        MenuSchema.find({ $or: [queryByName, queryById] }).then((menu)=>{
            res.json({
                success:true,
                menu
            })
        }).catch((err)=>{
            res.json({
                err
            })
        })
    },

    GetAll : (req, res, next) => {
        MenuSchema.find().then((menu)=>{
            res.json({
                success : true,
                menu
            })
        }).catch((err)=>{
            res.json({
                err
            })
        })
    },

    Create : async(req, res, next) => {
        console.log(req.body)
        try{
            const menuBody = {
                name : req.body.name,
                pName : req.body.pName
            }

            const result = await menuSchema.validateAsync(menuBody);

            const doesExist = await MenuSchema.findOne({ name : result.name})
            if(doesExist) throw createError.Conflict(`${result.name} already exists`);
            const newMenu = new MenuSchema(menuBody);
            const savedMenu = await newMenu.save();
            res.json({
                success : true,
                savedMenu
            })
        }catch(err){
            if(err.isJoi === true) err.status =422
            next(err)
        }
    },
    UpdateOne : async(req, res, next) => {
               
    }

    
}
