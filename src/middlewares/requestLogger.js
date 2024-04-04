const requestLoggerMiddleware = async (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`Log 📃| Received a ${req.method} request for ${req.url}.`)
  next()
}

module.exports = requestLoggerMiddleware
