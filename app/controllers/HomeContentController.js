const mongoose = require('mongoose');
const createError = require('http-errors')

const HomeContentSchema = require('../models/homeContent');
const { homeContentSchema } = require('../helpers/validation_schema');

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