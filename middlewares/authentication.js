const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
	try {
		const { access_token } = req.headers;
		if (!access_token) {
			throw { name: "NoAuthentication" };
		}
		const payload = verifyToken(token);

		const foundUser = await User.findOne({
			where: {
				id: payload.id,
				email: payload.email,
			},
		});
		if (!foundUser) {
			throw { name: "InvalidToken" };
		}
		req.user = {
			id: foundUser.id,
			email: foundUser.email,
			role: foundUser.role,
		};
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = authentication;
