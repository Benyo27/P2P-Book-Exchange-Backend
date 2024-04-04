const express = require('express')
const bodyParser = require('./body-parser')
const appConfig = require('../../../config/app-config')

function createRouter () {
  return express.Router()
}

function createApp () {
  const app = express()
  app.use(bodyParser.json({ limit: appConfig.json_limit }))
  app.use(bodyParser.urlencoded({
    limit: appConfig.json_limit,
    extended: true,
    parameterLimit: appConfig.parameter_limit
  }))
  return app
}

module.exports = {
  createRouter,
  createApp
}
