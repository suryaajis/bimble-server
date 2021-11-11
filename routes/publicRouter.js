const express = require("express");
const publicRouter = express.Router();
const PublicUserController = require("../controllers/public/PublicUserController");
const CourseController = require("../controllers/public/CourseController");
const authentication = require("../middlewares/authentication");
const Usercourse = require('../controllers/public/UserCourseController')


publicRouter.post("/register", PublicUserController.register);
publicRouter.post("/login", PublicUserController.login);
publicRouter.get("/courses", CourseController.readAllCourses);
publicRouter.get("/courses/:courseId", CourseController.readCourseDetail);


publicRouter.use(authentication);
publicRouter.get("/users", PublicUserController.readUser);
publicRouter.put("/users", PublicUserController.updateUser);

publicRouter.get('/userCourse', Usercourse.getAll)
publicRouter.get('/userCourses/:courseId', Usercourse.getById)

module.exports = publicRouter

