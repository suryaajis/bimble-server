const express = require('express')
const publicRouter = express.Router()
const PublicController = require('../controllers/PublicController')

publicRouter.post('/register', PublicController.register)
publicRouter.post('/login', PublicController.login)

module.exports = publicRouter