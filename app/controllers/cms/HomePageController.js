const mongoose = require('mongoose');
const createError = require('http-errors')

const HomePageSchema = require('../../models/cms/HomePage');
const { homePageSchema } = require('../../helpers/validation_schema');
const User = require('../../models/users/Users');

module.exports = {
    GetAll : (req, res, next) => {
        res.json(
            "fetching home page content.."
        )
    },
    GetById : (req, res, next) => {
        res.json(
            "Get home page"
        )
    },

    UpdateOne : async(req, res, next) => {
        res.json(
            "Updating home page by id"
        )
    }
}