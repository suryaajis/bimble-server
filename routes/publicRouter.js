const express = require("express");
const publicRouter = express.Router();
const PublicUserController = require("../controllers/public/PublicUserController");
const CourseController = require("../controllers/public/CourseController");
const authentication = require("../middlewares/authentication");

publicRouter.post("/register", PublicUserController.register);
publicRouter.post("/login", PublicUserController.login);
publicRouter.get("/courses", CourseController.readAllCourses);
publicRouter.get("/courses/:courseId", CourseController.readCourseDetail);

publicRouter.use(authentication);
publicRouter.get("/users", PublicUserController.readUser);
publicRouter.put("/users", PublicUserController.updateUser);

module.exports = publicRouter;
