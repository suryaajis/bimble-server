const express = require("express");
const adminRouter = express.Router();
const AdminController = require("../controllers/admin/AdminUserController");
const CourseController = require("../controllers/admin/AdminCourseController");
const CategoryController = require("../controllers/admin/AdminCategoryController");
const CommentController = require("../controllers/admin/AdminCommentController");
const VideoController = require("../controllers/admin/AdminVideoController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const uploadImages = require('../middlewares/uploadImages');
const { upload } = require('../helpers/multer');

adminRouter.use(authentication);
adminRouter.get("/users", authorization, AdminController.findAllUsers);
adminRouter.get("/courses", authorization, CourseController.findAllCourses);
adminRouter.get("/courses/:courseId", authorization, CourseController.findCourseById);
adminRouter.post("/courses",authorization, upload.array('Videos', 3), uploadImages, CourseController.createCourse);
adminRouter.put("/courses/:courseId", authorization, CourseController.updateCourse);
adminRouter.patch("/courses/:courseId", authorization, CourseController.patchCourse);
adminRouter.get("/categories", authorization, CategoryController.findAllCategories);
adminRouter.post("/categories", authorization, CategoryController.createCategory);
adminRouter.delete("/categories/:categoryId", authorization, CategoryController.deleteCategory);
adminRouter.delete("/comments/:commentId", authorization, CommentController.deleteComment);
adminRouter.post('/videos/:courseId', authorization, upload.array("Videos", 1), uploadImages, VideoController.addVideo)
adminRouter.get('/videos/:videoId', authorization, VideoController.readVideoDetail)
adminRouter.patch('/videos/:videoId', authorization, VideoController.updateVideo)
adminRouter.delete('/videos/:videoId', authorization, VideoController.deleteVideo)

module.exports = adminRouter;
