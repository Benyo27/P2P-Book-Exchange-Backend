const { hash, compare } = require('../utils/modules/bcrypt')
const { sign } = require('../utils/modules/jwt')
const db = require('../../models')
require('dotenv').config()

const User = db.User

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const hashedPassword = await hash(password, 10)

    await User.create({
      username,
      email,
      password: hashedPassword
    })

    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }

    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const profile = async (req, res) => {
  try {
    res.json({
      username: req.user.username,
      email: req.user.email
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  register,
  login,
  profile
}
