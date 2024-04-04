const { verify } = require('../utils/modules/jwt')
const db = require('../../models')
require('dotenv').config()

const User = db.User

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const decodedToken = verify(token, process.env.JWT_SECRET)
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findByPk(decodedToken.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    req.user = user

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = authenticateUser
