const { Pet } = require('../models/index.js');
const pet = require('../models/pet');

// Creación de registro de la mascota.

module.exports.createPet = async (req, res) => {
    try{
        const newPet = req.body
        await Pet.create(newPet)
        res.status(200).json({ pet: newPet })
    } catch {
        res.status(400).json({ message: 'No se ha podido generar una nueva mascota.' });
    }
}

// Búsqueda por ID de la mascota.

module.exports.searchPet = async (req, res) => {
    try {
        await Pet.findByPk(req.params.id)
        res.status(200).json({ data: pet })
    } catch {
        res.status(400).json({ message: 'No hemos podido encontrar los datos de su mascota.' })
    }
}

// Búsqueda de todo el listado de mascotas. (Solo Admin.)

module.exports.searchAllPet = async (req, res) => {
    try{
        let pets = await Pet.findAll({})
        res.status(200).json( {Data: pets} )
    } catch {
        res.status(400).json({ message: 'No hemos podido encontrar el listado completo de mascotas.'})
    }
}

// Borrar registro de la mascota.

module.exports.deletePet = async (req, res) => {
    try{
        const deletePet = req.body
        await Pet.delete(deletePet)
    } catch {
        res.status(400).json({ message: 'No hemos podido borrar el registro de su mascota.' })
    }
}