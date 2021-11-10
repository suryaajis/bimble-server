const { Course } = require("../models");

const authorization = async (req, res, next) => {
	try {
		const role = req.user.role;
		const CourseId = +req.params.id;

		const foundCourse = await Course.findByPk(CourseId);
		if (!foundNews) {
			throw { name: "NotFound" };
		}
		if (role === "Admin") {
			next();
		} else {
			throw { name: "Forbidden" };
		}
	} catch (err) {
		next(err);
	}
};

module.exports = authorization;
