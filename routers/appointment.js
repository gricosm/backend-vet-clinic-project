
const router = require('express').Router();
const controller = require('../controllers/appointment.js');
const checkRole = require('../middleware/decryptoken')
const checkToken = require('../middleware/functions')


router.post('/',checkToken.verificarToken ,controller.createAppointment); // Método para crear la cita.//funciona
router.get('/all', checkToken.verificarToken, checkRole.role, controller.searchAll); // Método para poder ver todas las citas. (Solo para ADMIN) //funciona
router.put('/', checkToken.verificarToken ,controller.updateAppointment); // Método para modificar la fecha.
router.delete('/deleteone', checkToken.verificarToken, controller.deleteOne); // Método para que un usuario elimine todas sus citas
router.delete('/deleteall', checkToken.verificarToken, controller.deleteAppointment); // Método para que un usuario elimine todas sus citas
router.get('/searchall',checkToken.verificarToken, controller.searchAllPending )

module.exports = router;

