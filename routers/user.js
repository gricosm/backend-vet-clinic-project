const router = require('express').Router()
const controller = require('../controllers/user')
const middleware= require('../middleware/functions')
const checkRole = require('../middleware/decryptoken')


router.post('/login',controller.loggin)// logeamos User
router.post('/logout', controller.logout )
router.post('/',  controller.createUser) // creamos usuario
router.post('/admin', middleware.verificarToken, checkRole.role, controller.createAdmin)
router.get('/all', middleware.verificarToken,checkRole.role ,controller.searchAll) // Busca todos los usario
router.get('/:id', middleware.verificarToken, controller.searchUser) // Busca por id
router.delete('/', middleware.verificarToken, checkRole.role, controller.deleteUser)//EliminarUser (Solo admin)



module.exports = router;