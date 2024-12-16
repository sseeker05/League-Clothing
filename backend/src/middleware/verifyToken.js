const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET_KEY

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized'
      })
    }
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token'
    })
  }
}

module.exports = verifyToken