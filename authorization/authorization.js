const jwt = require('jsonwebtoken')
const JWT_SECRET = require('./secret');



const authorization = async (req, res, next) => {
  const authCookie = req.cookies.auth;

  if (authCookie != undefined || authCookie != null) {
    if (authCookie.startsWith('Bearer')) {
      const token = authCookie.split(' ')[1]
      try {
        const werify = await jwt.verify(token, JWT_SECRET)
        return next()
      } catch (error) {
        return res.redirect('/login');
      }
    }

  }
  return res.redirect('/login')
}

module.exports = { authorization }
