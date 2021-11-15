const { Video, Course } = require("../../models");

class VideoController {
  static async addVideo(req, res, next) {
    try {
      const { courseId } = req.params;
      const { Videos } = req.body;

      const foundCourse = await Course.findByPk(+courseId);

      if (!foundCourse) {
        throw { name: "CourseNotFound" };
      }

      const response = await Video.create({
        name: Videos[0].name,
        videoUrl: Videos[0].videoUrl,
        CourseId: foundCourse.id,
      });

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = VideoController
