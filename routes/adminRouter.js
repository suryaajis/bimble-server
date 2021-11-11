const express = require("express");
const adminRouter = express.Router();
const AdminController = require("../controllers/admin/AdminUserController");
const CourseController = require("../controllers/admin/CourseController");
const CategoryController = require("../controllers/admin/CategoryController");

adminRouter.post("/register", AdminController.register);
adminRouter.post("/login", AdminController.login);
adminRouter.post("/loginGoogle", AdminController.loginGoogle);
adminRouter.get("/users", AdminController.findAllUsers);
adminRouter.put("/users/:userId", AdminController.editUserById);
adminRouter.get("/courses", CourseController.findAllCourses);
adminRouter.get("/courses/:courseId", CourseController.findCourseById);
adminRouter.post("/courses", CourseController.createCourse);
adminRouter.put("/courses/:courseId", CourseController.updateCourse);
adminRouter.patch("/courses/:courseId", CourseController.patchCourse);
adminRouter.get('/categories', CategoryController.findAllCategories)
adminRouter.post('/categories', CategoryController.createCategory)
adminRouter.patch('/categories/:categoryId', CategoryController.patchCategory)
adminRouter.delete('/categories/:categoryId', CategoryController.deleteCategory)

module.exports = adminRouter;
