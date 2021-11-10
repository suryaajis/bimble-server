const express = require('express')
const publicRouter = express.Router()
const PublicUserController = require('../controllers/public/PublicUserController')
const authentication = require('../middlewares/authentication')

publicRouter.post('/register', PublicUserController.register)
publicRouter.post('/login', PublicUserController.login)

publicRouter.use(authentication)
publicRouter.get('/users', PublicUserController.readUser)

module.exports = publicRouter