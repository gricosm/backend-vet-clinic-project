const router = require('express').Router()
const controller = require('../controllers/user')
const middleware= require('../middleware/functions')
const checkRole = require('../middleware/decryptoken')

router.post('/login', controller.login)
// router.post('/logout', controller.logout )
router.post('/',  controller.createUser)
router.post('/admin', middleware.verificarToken, checkRole.role, controller.createAdmin)
router.get('/all', middleware.verificarToken,checkRole.role ,controller.searchAll)
router.get('/:id', middleware.verificarToken, controller.searchUser)
router.delete('/', middleware.verificarToken, checkRole.role, controller.deleteUser)

module.exports = router;