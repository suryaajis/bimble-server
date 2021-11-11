const authorization = async (req, res, next) => {
	try {
		const role = req.user.role;
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
