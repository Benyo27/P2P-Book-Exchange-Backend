const jwt = require('jsonwebtoken')

function sign (payload, secret, options) {
  const token = jwt.sign(payload, secret, options)
  return token
}

function verify (token, secret) {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

function decode (token) {
  try {
    return jwt.decode(token)
  } catch (error) {
    throw new Error('Invalid token')
  }
}

module.exports = {
  sign,
  verify,
  decode
}
