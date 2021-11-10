const { Course, Category, User, Video } = require("../../models");

class CourseController {
	static async findAllCourses(req, res, next) {
		try {
			const response = await Course.findAll({
				include: [
					{
						model: Category,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
					{
						model: User,
						attributes: {
							exclude: ["password"],
						},
					},
					{
						model: Video,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				],
				order: [["id", "DESC"]],
			});
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}
	static async findCourseById(req, res, next) {
		try {
			const { courseId } = req.params;

			const foundCourse = await Course.findByPk(courseId, {
				include: [
					{
						model: Category,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
					{
						model: User,
						attributes: {
							exclude: ["password", "createdAt", "updatedAt"],
						},
					},
					{
						model: Video,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				],
				order: [["id", "DESC"]],
			});
			res.status(200).json(foundCourse);
		} catch (err) {
			next(err);
		}
	}

	static async createCourse(req, res, next) {
		try {
			const { name, description, price, thumbnailUrl, difficulty, status, CategoryId } = req.body;
			const newCourse = await Course.create({
				name,
				description,
				price,
				thumbnailUrl,
				difficulty,
				status,
				CategoryId,
			});
			res.status(201).json(newCourse);
		} catch (err) {
			next(err);
		}
	}
	static async updateCourse(req, res, next) {
		try {
			const { courseId } = req.params;
			const { name, description, price, thumbnailUrl, difficulty, status, CategoryId } = req.body;
			const updatedCourse = await Course.update(
				{
					name,
					description,
					price,
					thumbnailUrl,
					difficulty,
					status,
					CategoryId,
				},
				{
					where: { id: courseId },
					returning: true,
				}
			);
			if (updatedCourse[0] === 0) {
				throw "Course not found";
			} else {
				res.status(200).json(updatedCourse[1][0]);
			}
		} catch (err) {
			next(err);
		}
	}
	static async patchCourse(req, res, next) {
		try {
			const { courseId } = req.params;
			const { status } = req.body;
			const updatedCourse = await Course.update(
				{
					status,
				},
				{
					where: { id: courseId },
					returning: true,
				}
			);
			if (updatedCourse[0] === 0) {
				throw "Course not found";
			} else {
				res.status(200).json(updatedCourse[1][0]);
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = CourseController;
