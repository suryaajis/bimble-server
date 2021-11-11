const express = require('express')
const publicRouter = express.Router()
const UsercourseController = require('../controllers/public/UserCourseController')
const PublicUserController = require("../controllers/public/PublicUserController");
const CourseController = require("../controllers/public/CourseController");
const authentication = require("../middlewares/authentication")

publicRouter.post("/register", PublicUserController.register);
publicRouter.post("/login", PublicUserController.login);
publicRouter.get("/courses", CourseController.readAllCourses);
publicRouter.get("/courses/:courseId", CourseController.readCourseDetail);

publicRouter.use(authentication);
publicRouter.get("/users", PublicUserController.readUser);
publicRouter.put("/users", PublicUserController.updateUser);

publicRouter.get('/userCourse', UsercourseController.getAll)
publicRouter.get('/userCourses/:courseId', UsercourseController.getById)
publicRouter.post('/userCourses/:courseId', UsercourseController.addUserCourse)

module.exports = publicRouter

