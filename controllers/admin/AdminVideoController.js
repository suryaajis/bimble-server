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

      const addVideo = await Video.create({
        name: Videos[0].name,
        videoUrl: Videos[0].videoUrl,
        CourseId: foundCourse.id,
      });

      res.status(201).json({
        name: addVideo.name,
        CourseId: addVideo.CourseId,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteVideo(req, res, next) {
    try {
      const { videoId } = req.params

      await Video.destroy({
        where: {
          id: videoId
        }
      })

      res.status(200).json({message: "Video has been deleted"})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = VideoController;
