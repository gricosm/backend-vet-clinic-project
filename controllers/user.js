const { User, Appointment } = require('../models/index.js')
const { Op, DATE } = require("sequelize")
const hashing = require('../Middleware/functions')
const { Console } = require('console')

// Crear Usuario.

module.exports.createUser = async (req, res) => {
    try {
        const newUser = req.body
        newUser.role = 'user'
        newUser.password = hashing.createHash(newUser.password)
        await User.create(newUser)
        res.status(200).json({ user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'No se ha podido generar un nuevo usuario.', });
    }
}

// Crear Administrador.

module.exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = req.body
        newAdmin.password = hashing.createHash(newAdmin.password)
        await Admin.create(newAdmin)
        res.status(200).json({ Admin: newAdmin });
    } catch (error) {
        res.status(400).json({ message: 'No se ha podido generar un nuevo administrador.', });
    }
}

// Login del Usuario.

module.exports.login = async (req, res) => {
    
    try {
        let hashDescoted = await hashing.compareHash(req.body)
        res.status(200).json({ hashDescoted })
    } catch (error) {
        res.json({
            message: 'El mail o la contraseña son incorrectos.',
            errors: error,
            status: 400
        })
    }
}

// Búsqueda de Usuario. 

module.exports.searchUser = (req, res) => {
    try {
        User.findByPk(req.params.id)
            .then((user) => {
                if (!user) res.status(200).send('El usuario no existe')
                res.status(200).json({ data: user })
            })
    } catch (error) {
        res.json({
            message: 'Usuario no encontrado.',
            errors: error,
            status: 400
        })
    }
}

// Búsqueda de todos los Usuarios. (Solo Administradores.)

module.exports.searchAll = async (req, res) => {
    try {
        let users = await User.findAll({})
        res.status(200).json({ Data: users })
    } catch (error) {
        res.json({
            message: 'No eres admin.',
            errors: error,
        })
    }
}

// Eliminar Usuario.

module.exports.deleteUser = async (req, res) => {
    try {
        let arr = req.query.id
        await User.destroy({ where: { id: arr } })
        res.status(200).json({ Data: 'El usuario se ha eliminado con éxito.' })
    } catch (error) {
        res.status(400).send({
            message: 'No se ha podido eliminar el usuario.',
            status: 400
        })
    }
}