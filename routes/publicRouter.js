const express = require('express')
const publicRouter = express.Router()
const UsercourseController = require('../controllers/public/UserCourseController')
const PublicUserController = require("../controllers/public/PublicUserController");
const CourseController = require("../controllers/public/CourseController");
const CommentController = require('../controllers/public/CommentController');
const RatingController = require('../controllers/public/RatingController');
const authentication = require("../middlewares/authentication");
const ratingAuthorization = require("../middlewares/ratingAuthorization");

publicRouter.post("/register", PublicUserController.register);
publicRouter.post("/login", PublicUserController.login);
publicRouter.post("/googleLogin", PublicUserController.googleLogin);
publicRouter.get("/courses", CourseController.readAllCourses);
publicRouter.get("/courses/:courseId", CourseController.readCourseDetail);
publicRouter.get('/categories', CourseController.readCategories)
publicRouter.get('/ratings/:courseId', RatingController.getRating)

publicRouter.use(authentication);
publicRouter.get("/users", PublicUserController.readUser);
publicRouter.put("/users", PublicUserController.updateUser);

publicRouter.get('/userCourse', UsercourseController.getAll)
publicRouter.get('/userCourses/:courseId', UsercourseController.getById)
publicRouter.post('/userCourses/:courseId', UsercourseController.addUserCourse)

publicRouter.post('/comments/:videoId', CommentController.AddComment)
publicRouter.get("/ratingUser/:courseId", RatingController.getRatingByUserId)
publicRouter.post('/ratings/:courseId', ratingAuthorization, RatingController.addRating)

module.exports = publicRouter

