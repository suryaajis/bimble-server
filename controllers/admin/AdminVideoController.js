const { Video, Course } = require("../../models");

class VideoController {
  static async readVideoDetail(req, res, next) {
    try {
      const { videoId } = req.params
      const response = await Video.findOne({
        where: { id: videoId },
        attributes: ['id', 'name', 'videoUrl']
      })

      if(!response) {
        throw {name: "VideoNotFound"}
      }

      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

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
      const { videoId } = req.params;

      const foundVideo = await Video.findByPk(videoId);

      if (!foundVideo) {
        throw { name: "VideoNotFound" };
      }

      await Video.destroy({
        where: {
          id: videoId,
        },
      });

      res.status(200).json({ message: "Video has been deleted" });
    } catch (err) {
      next(err);
    }
  }

  // masih error
  static async updateVideo(req, res, next) {
    try {
      const { videoId } = req.params;
      const { name:inputName } = req.body;

      const foundVideo = await Video.findByPk(videoId);

      if (!foundVideo) {
        throw { name: "VideoNotFound" };
      }

      const response = await Video.update(
        { name: inputName },
        {
          where: { id: videoId },
          returning: true,
        }
      );
      console.log(response)

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = VideoController;
