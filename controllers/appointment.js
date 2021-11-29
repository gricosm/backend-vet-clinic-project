const { User, Appointment, sequelize } = require('../models/index.js')
const { Op } = require("sequelize")
const decrypTuser = require('../Middleware/decryptoken')
const moment = require("moment");
const timeFunction = require('../helper/calcularfecha')

// Creamos una cita. (Aquí necesitamos middleware para autenticar USER)

module.exports.createAppointment = async (req, res) => {
    try {
        let user = decrypTuser.decryptoken(req.headers.token)
        let verifyTime = timeFunction.difTime(req.body.date)
        if (verifyTime === false) {
            res.send('Fecha no válida.')
        } else {
            let respond = await Appointment.create({
                date: verifyTime,
                state: 'Pending',
                userId: user.data,
            })
            res.status(200).json({ data: respond });
        }
    } catch (error) {
        res.status(400).send({
            message: 'No se ha podido crear una nueva cita.',
            errors: error,
            status: 400
        });
    }
}

// Buscamos todas las citas. (Aquí necesitamos middleware para autenticar ADMIN)

module.exports.searchAll = async (req, res) => {
    try {
        let listAppointment = await Appointment.findAll({
            include: [
                { model: pet },
                { model: user }
            ]
        })
        res.status(200).json({ Data: listAppointment })
    } catch (error) {
        res.status(400).send({
            message: 'No se han podido obtener las citas.',
            status: 400
        });
    }
}

// Búsqueda de citas por estado pendiente.

module.exports.searchAllPending = async (req, res) => {
    try {
        let result = await Appointment.findAll(
            { 
                where: { state: 'Pending' },
                include: [
                    { model: pet },
                    { model: user }
                ] })
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(400).send({
            message: 'No tienes citas pendientes.',
            status: 400
        });
    }
}

// Modificar la fecha de la cita.

module.exports.updateAppointment = async (req, res) => {
    try {
        await Appointment.update({ date: req.body.fechaModificar }, {
        where: { date: req.body.fechaActual }
        })
        res.status(200).json({ data: 'La fecha de su cita se ha modificado con éxito.' });
    } catch (error) {
        res.status(400).send({
            message: 'La cita no se ha podido modificar.',
            status: 400
        });
    }
}

// Eliminar cita por su ID.

module.exports.deleteAppointment = async(req, res) => {
    try{
       let user = decrypTuser.decryptoken(req.headers.token)
       await Appointment.destroy({ where: { userId: user.data } })
        res.status(200).json({ Data: 'La cita se ha eliminado.' })
    } catch(error) {
        res.status(400).send({
            message: 'Ha habido un problema.',
            status: 400
        }); }
}

module.exports.deleteOne = async (req, res) => {
    try{
        let dateDelete = req.body
        let user = decrypTuser.decryptoken(req.headers.token)
        await Appointment.destroy({
            where: {
                userId: user.data,
                date: dateDelete.AppointementDelete
            } })
        res.status(200).json({ data: 'La cita se ha eliminado con éxito' });
    } catch(error) {
        res.status(400).send({
            message: 'Ha habido un problema.',
            status: 400
        });
    }
}