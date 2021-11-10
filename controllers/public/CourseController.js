const { Course, Category, User, Video } = require("../../models");

class CourseController {
  static async readAllCourses(req, res, next) {
    try {
      const response = await Course.findAll({
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Video,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "DESC"]],
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
  
  static async readCourseDetail(req, res, next) {
    try {
      const { courseId } = req.params;

      const foundCourse = await Course.findByPk(courseId, {
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: User,
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          },
          {
            model: Video,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [["id", "DESC"]],
      });
      res.status(200).json(foundCourse);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CourseController;
