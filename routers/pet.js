const router = require('express').Router()
const controller = require('../controllers/pet')
const middleware= require('../middleware/functions')
const checkRole = require('../middleware/decryptoken')

router.post('/',  controller.createPet)
router.get('/all', middleware.verificarToken, checkRole.role ,controller.searchAll)
router.get('/:id', middleware.verificarToken, controller.searchPet)
router.delete('/', middleware.verificarToken, checkRole.role, controller.deletePet)

module.exports = router;