const { UserCourse, User, Course, Video, Comment } = require("../../models");
const sendEmail = require("../../helpers/nodemailer");

class UsercourseController {
  static async getAll(req, res, next) {
    try {
      const { id } = req.user;
      const usercourse = await UserCourse.findAll({
        where: { UserId: id, isPaid: true },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Course,
            attributes: {
              exclude: ["updatedAt", "createdAt", "id"],
            },
          },
        ],
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      res.status(200).json(usercourse);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.user;
      const { courseId } = req.params;

      const usercourse = await UserCourse.findOne({
        where: { UserId: id, CourseId: courseId },
        include: [
          {
            model: User,
            attributes: ["name"],
          },
        ],
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });

      if (!usercourse) throw { name: `CourseNotFound` };

      const course = await Course.findOne({
        where: { id: courseId },
        include: [
          {
            model: Video,
            attributes: {
              exclude: ["updatedAt", "createdAt"],
            },
            include: {
              model: Comment,
              attributes: ["id", "comment"],
              include: {
                model: User,
                attributes: ["name"],
              },
            },
          },
        ],
        order: [[Video, "id", "ASC"]],
      });

      let result = {
        id: usercourse.id,
        UserId: usercourse.UserId,
        CourseId: usercourse.CourseId,
        isPaid: usercourse.isPaid,
        chargeId: usercourse.chargeId,
        referenceId: usercourse.referenceId,
        User: usercourse.User,
        Course: course,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addUserCourse(req, res, next) {
    try {
      const { id } = req.user;
      const { courseId } = req.params;

      const user = await User.findByPk(id);

      const course = await Course.findByPk(courseId);

      if (!course) throw { name: `CourseNotFound` };

      const userCourse = await UserCourse.findAll({
        where: { UserId: id, CourseId: courseId },
      });

      if (userCourse.length) throw { name: "CourseAlreadyPurchased" };

      const newUserCourse = await UserCourse.create({
        UserId: id,
        CourseId: courseId,
        isPaid: false,
      });

      const option = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const payload = {
        subject: 'Thanks for your purchase',
        email: user.email,
        text: `
          Hello ${user.name}!
          <br/><br/>
          Thank you for purchasing ${
            course.name
          } from Bimble at ${course.createdAt.toLocaleString("en-US", option)}
        <br/>
        Don't forget to complete the payment process using OVO!`,
      };

      sendEmail(payload);
      res.status(201).json({
        id: newUserCourse.id,
        UserId: newUserCourse.UserId,
        CourseId: newUserCourse.CourseId,
        isPaid: newUserCourse.isPaid,
        chargeId: newUserCourse.chargeId,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsercourseController;
