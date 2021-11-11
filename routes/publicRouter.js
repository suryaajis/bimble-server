const express = require('express')
const publicRouter = express.Router()
const PublicController = require('../controllers/public/PublicUserController')
const UsercourseController = require('../controllers/public/UserCourseController')
const authentication = require('../middlewares/authentication')

publicRouter.post('/register', PublicController.register)
publicRouter.post('/login', PublicController.login)

publicRouter.use(authentication)

publicRouter.get('/userCourse', UsercourseController.getAll)
publicRouter.get('/userCourses/:courseId', UsercourseController.getById)
publicRouter.post('/userCourses/:courseId', UsercourseController.addUserCourse)

module.exports = publicRouter