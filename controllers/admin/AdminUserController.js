const { User } = require("../../models");

class AdminController {
	static async findAllUsers(req, res, next) {
		try {
			const users = await User.findAll();
			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = AdminController;
