const { UserCourse } = require('../models')

const ratingAuthorization = async (req, res, next) => {
	try {
		const { id } = req.user
        const { courseId } = req.params

        const userCourse = await UserCourse.findOne({
            where: { UserId: id, CourseId: courseId }
        })

        if (!userCourse) throw { name: "Forbidden" }

        next()
	} catch (err) {
		next(err);
	}
};

module.exports = ratingAuthorization;
