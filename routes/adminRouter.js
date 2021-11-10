const express = require("express");
const adminRouter = express.Router();
const AdminController = require("../controllers/admin/AdminUserController");
const CourseController = require("../controllers/admin/CourseController");

adminRouter.post("/register", AdminController.register);
adminRouter.post("/login", AdminController.login);
adminRouter.post("/loginGoogle", AdminController.loginGoogle);
adminRouter.get("/users", AdminController.findAllUsers);
adminRouter.put("/users/:userId", AdminController.editUserById);
adminRouter.get("/courses", CourseController.findAllCourses);
adminRouter.get("/courses/:courseId", CourseController.findCourseById);
adminRouter.post("/courses", CourseController.createCourse);
adminRouter.put('/courses/:courseId', CourseController.updateCourse)
adminRouter.patch('/courses/:courseId', CourseController.patchCourse)
// adminRouter.get('/categories', AdminController.findAllCategories)
// adminRouter.post('/categories', AdminController.createCategory)
// adminRouter.patch('/categories/:categoryId', AdminController.patchCategory)
// adminRouter.delete('/categories/:categoryId', AdminController.deleteCategory)

module.exports = adminRouter;
