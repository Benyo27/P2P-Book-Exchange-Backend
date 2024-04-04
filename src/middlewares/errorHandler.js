const { ValidationError, ConnectionError, DatabaseError } = require('sequelize')
const ErrorHandler = require('../utils/errorHandler')

const errorHandler = (err, req, res, next) => {
  console.log(`Error 🚨 | ${err.message} while sending a ${req.method} to ${req.originalUrl}`)
  if (err instanceof ValidationError) {
    const messages = err.errors.map((error) => error.message)
    if (err.parent && err.parent.constraint === 'requests_postulant_id_post_id') {
      return res.status(400).json({ error: 'Ya te has postulado a esta publicación.' })
    }
    return res.status(400).json({ errors: messages })
  }

  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  if (err instanceof ConnectionError) {
    return res.status(500).json({ error: err.message })
  }

  if (err instanceof DatabaseError) {
    return res.status(400).json({ error: err.message })
  }

  return res.status(500).json({ error: err.message })
}

module.exports = errorHandler
