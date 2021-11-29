const jwt = require("jsonwebtoken");

module.exports.role = (req, res,next) => {
  try {
    let objectRole = jwt.decode(req.headers.token)
    if (objectRole.role !== 'admin'){
      res.json( { error: error })
    }else{ next() }
  } catch (error) { res.json({ error: error }) }
}

module.exports.decryptoken = (user) => {
  let objectUser = jwt.decode(user)
  console.log(objectUser+'decri')
  return objectUser
}


