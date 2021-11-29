const bcrypt = require('bcrypt');
const redis = require('redis').default;
const JWTR = require('jwt-redis').default;
const redisClient = redis.createClient();
const jwtr = new JWTR(redisClient);
const moment = require("moment");
const { User } = require('../models/index.js');

// Aquí se genera el HASH para guardar la constraseña encriptada.

module.exports.createHash = (password) => {
    let encrypted = bcrypt.hashSync(password, 10)
    return encrypted
}

// Comparación del HASH para guardar crear el TOKEN con los datos.

module.exports.compareHash = async (objectUser) => {

    try {
        const hash = await User.findOne({ where: { mail: objectUser.mail } });

        if (hash.mail === null) { return false }

        if (hash.mail) {
            let compare = bcrypt.compareSync(objectUser.password, token.password)
            console.log(compare)
            if (compare) {
                const payload = {
                    data: hash.id,
                    role: hash.role,
                    iat: moment().unix(),
                    exp: moment().add(2, 'days').unix()
                }
                return jwtr.sign(payload, process.env.TOKEN)
            }
        }
    } catch (error) { console.log(error) }
}

// Verificación del Token

module.exports.verificarToken = (req, res, next) => {
    try {
        const token = req.headers.token
        jwtr.verify(token, process.env.TOKEN)
        next()
    } catch (error) { console.log(error) }
}

module.exports.logout = (req, res, next) => {
    const token = req.headers.token
    jwtr.destroy(token)
}
