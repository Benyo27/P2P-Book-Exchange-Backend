const bcrypt = require('bcrypt')

async function hash (password, saltRounds) {
  const hashToken = await bcrypt.hash(password, saltRounds)
  return hashToken
}

async function compare (password, hashedPassword) {
  const compare = await bcrypt.compare(password, hashedPassword)
  return compare
}

module.exports = {
  hash,
  compare
}
