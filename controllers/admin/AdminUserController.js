const { User, Comment } = require("../../models");
const { comparePassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");

class AdminController {
	static async register(req, res, next) {
		try {
			const { name, email, password } = req.body;

			const createUser = await User.create({
				name,
				email,
				password,
				role: "Admin",
			});

			const response = {
				name: createUser.name,
				email: createUser.email,
				role: createUser.role,
			};

			res.status(201).json(response);
		} catch (err) {
			next(err);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;

			const foundUser = await User.findOne({
				where: {
					email,
				},
			});

			if (!foundUser) {
				throw { name: "InvalidInput" };
			}

			if (!comparePassword(password, foundUser.password)) {
				throw { name: "InvalidInput" };
			}

			const payload = {
				name: foundUser.name,
				email: foundUser.email,
				role: foundUser.role,
			};

			const token = signToken(payload);

			res.status(200).json({ access_token: token });
		} catch (err) {
			next(err);
		}
	}
	static async loginGoogle(req, res, next) {
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

		try {
			const ticket = await client.verifyIdToken({
				idToken: req.body.idToken,
				audience: CLIENT_ID,
			});
			const payload = ticket.getPayload();

			const { email, given_name } = payload;

			const [user] = await User.findOrCreate({
				where: {
					email,
				},
				defaults: {
					name: given_name,
					password: (Math.random() + 1).toString(36).substring(7),
					role: "Staff",
				},
			});
			const access_token = signToken({
				id: user.id,
				email: user.email,
				role: user.role,
			});

			res.status(200).json({
				access_token,
			});
		} catch (err) {
			next(err);
		}
	}
	static async findAllUsers(req, res, next) {
		try {
			const users = await User.findAll();
			res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}
	static async editUserById(req, res, next) {
		try {
			const { name, email, password } = req.body;
			const { userId } = req.params;
			const updatedUser = await User.update(
				{ name, email, password },
				{
					where: { id: userId },
					returning: true,
				}
			);
			if (!updatedUser[0]) {
				throw { name: "NotFound" };
			} else {
				res.status(200).json(updatedUser[1][0]);
			}
		} catch (err) {
			next(err);
		}
	}
}

module.exports = AdminController;
