const { User, Appointment } = require('../models/index.js')
const { Op } = require("sequelize")
// const { Module } = require('module')
// const { Json } = require('sequelize/types/lib/utils')
const decrypTuser = require('../middleware/decryptoken')
const moment = require("moment");

module.exports.difTime = (timeAppoinment) => {
    let datePar = Date.parse(timeAppoinment)
    let datePresent =Date.now()
    if (datePar >= datePresent){
        return timeAppoinment
    }else{ return false }
}