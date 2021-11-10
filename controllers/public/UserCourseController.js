const { UserCourse, User, Course } = require('../../models')

class Usercourse {
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
                            exclude: ['updatedAt', 'createdAt', 'id']
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

            if (!course.length) throw { name: `Course Not Found`}

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
                        }
                    }
                ],
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                }
            })

            if (!usercourse) throw { name: `Course Not Found`}
            
            res.status(200).json(usercourse)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Usercourse