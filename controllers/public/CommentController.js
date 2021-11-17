const { Comment, UserCourse, Course, Video } = require("../../models");

class CommentController {
  static async AddComment(req, res, next) {
    try {
      const { videoId } = req.params;
      const { comment } = req.body;
      const { id } = req.user;

      console.log(videoId, 'video id')
      console.log(comment)
      console.log(id)

      const foundVideo = await Video.findOne({
        where: {
          id: videoId
        },
        include: Course
      })

      console.log(foundVideo)

      if(!foundVideo) {
        throw {name: "VideoNotFound"}
      }
    
      const foundMyCourse = await UserCourse.findOne({
        where: {
          CourseId: foundVideo.Course.id,
          UserId: id
        }
      })

      console.log(foundMyCourse)

      if (foundMyCourse.isPaid === false) {
        throw { name: "CourseNotPaid" };
      }

      const newComment = await Comment.create({
        comment,
        VideoId: videoId,
        UserId: id,
      });

      res.status(201).json({
        comment: newComment.comment,
        VideoId: newComment.VideoId,
        UserId: newComment.UserId,
      });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}

module.exports = CommentController;
