require('dotenv').config()
module.exports = {
  verifyTokenMiddleware: (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader !== undefined) {
      const jwt = require('jsonwebtoken')
      const bearer = bearerHeader.split(' ')
      const token = bearer[1]
      try {
        const decoded = jwt.verify(token, process.env.SECRET)
        if (decoded) {
          console.log(decoded)
          req.user_id = decoded.id
          req.user_name = decoded.name
          req.user_email = decoded.email
          req.level = decoded.level
          next()
        } else { throw new Error(decoded) }
      } catch (err) {
        console.error(err)
        res.status(403).json({message:'token is invalid'})
      }
    } else { 
      res.status(403).json({message:'token is undefined'})
    }
  },
}