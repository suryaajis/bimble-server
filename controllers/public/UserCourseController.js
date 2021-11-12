const { UserCourse, User, Course, Video, Comment } = require('../../models')
const sendEmail = require('../../helpers/nodemailer')

class UsercourseController {
    static async getAll (req, res, next) {
        try {
            const { id } = req.user
            const usercourse = await UserCourse.findAll({
                where: {UserId: id},
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    },
                    {
                        model: Course,
                        attributes: {
                            exclude: ['updatedAt', 'createdAt', 'id'],
                        }
                    }
                ],
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                }
            })
            res.status(200).json(usercourse)
        } catch (error) {
            next(error)
        }
    }

    static async getById (req, res, next) {
        try {
            const { id } = req.user
            const { courseId } = req.params

            const course = await Course.findAll({
                where: { id: courseId }
            })

            if (!course.length) throw { name: `CourseNotFound`}

            const usercourse = await UserCourse.findOne({
                where: { UserId: id, CourseId: courseId },
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    },
                    {
                        model: Course,
                        attributes: {
                            exclude: ['updatedAt', 'createdAt', 'id']
                        },
                        include: [
                            {
                                model: Video,
                                attributes: {
                                    exclude: ['updatedAt', 'createdAt']
                                },
                                include: {
                                    model: Comment,
                                    attributes: ['id', 'comment'],
                                    include: {
                                        model: User,
                                        attributes: ['name']
                                    }
                                }
                            }
                        ]
                    }
                ],
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                }
            })

            if (!usercourse) throw { name: `CourseNotFound`}
            
            res.status(200).json(usercourse)
        } catch (error) {
            next(error)
        }
    }

    static async addUserCourse (req, res, next) {
        try {
            const { id } = req.user
            const { courseId } = req.params

            const user = await User.findByPk(id)

            const course = await Course.findAll({
                where: { id: courseId }
            })

            if (!course.length) throw { name: `CourseNotFound` }
            
            const userCourse = await UserCourse.findAll({
                where: { UserId: id, CourseId: courseId }
            })

            if (userCourse.length) throw { name: 'CourseAlreadyPurchased' }

            const newUserCourse = await UserCourse.create({
                UserId: id,
                CourseId: courseId,
                isPaid: false
            })
            
            const option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
            const payload = {
                email: user.email,
                text: `
                Hello ${user.name}!
                <br/><br/>
                Thank you for purchasing ${course[0].name} from Bimble at ${course[0].createdAt.toLocaleString('en-US', option)}
                <br/>
                Don't forget to complete the payment process using OVO!`
            }

            sendEmail(payload)
            res.status(201).json({
                UserId: newUserCourse.UserId,
                CourseId: newUserCourse.CourseId,
                isPaid: newUserCourse.isPaid,
                chargeId: newUserCourse.chargeId
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UsercourseController