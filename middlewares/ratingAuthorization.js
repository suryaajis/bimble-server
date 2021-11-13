const { UserCourse } = require('../models')

const ratingAuthorization = async (req, res, next) => {
	try {
		const { id } = req.user
        const { courseId } = req.params

        const userCourse = await UserCourse.findOne({
            where: { UserId: id, CourseId: courseId, isPaid: true }
        })

        if (!userCourse) throw { name: "CourseNotPaid" }

        next()
	} catch (err) {
		next(err);
	}
};

module.exports = ratingAuthorization;
