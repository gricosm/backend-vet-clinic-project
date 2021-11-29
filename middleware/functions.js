const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");
const redis = require('redis').default;
const JWTR = require('jwt-redis').default
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);
const { User, Appointment } = require('../models/index.js')

//generamos el hash para guardar la contraseña encriptada!
const moment = require("moment");
module.exports.createHash = (password) => {
    let encrypted = bcrypt.hashSync(password, 10)
    return encrypted
}
//function para comparar el hash para guardar la contraseña encriptada!
module.exports.compareHash = async (objectUser) => {

    try {
        const project = await User.findOne({ where: { mail: objectUser.mail } });

        console.log(project.mail + 'es aquí')
        if (project.mail === null) {
            console.log(project + 'es aquí 2')
            return false
        } 
        
        if (project.mail) {
            let compare = bcrypt.compareSync(objectUser.password, project.password)
            console.log(compare)
            if (compare) {
                const payload = {
                    data: project.id,
                    role: project.role,
                    iat: moment().unix(),
                    exp: moment().add(2, 'days').unix()
                }
                return jwtr.sign(payload, process.env.TOKEN)
            }
        }
    } catch (error) {

        console.log(error)

    }
}
//verificaToken
module.exports.verificarToken = (req, res, next) => {

    try {
        const token = req.headers.token
        jwtr.verify(token, process.env.TOKEN)
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports.logout = (req, res, next) => {
    const token = req.headers.token
    jwtr.destroy(token)
}
