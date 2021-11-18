const { User } = require("../../models");
const { comparePassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");
const sendEmail = require("../../helpers/nodemailer");
const { OAuth2Client } = require("google-auth-library");

class PublicUserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const createUser = await User.create({
        name,
        email,
        password,
        role: "User",
      });

      const response = {
        name: createUser.name,
        email: createUser.email,
        role: createUser.role,
      };

      const payload = {
        subject: "Welcome to BIMBLE",
        email: response.email,
        text: `
				Hello ${response.name} ${response.email}!
				<br/>
				Thank you for joining Bimble,
				Enjoy your stay here!`,
      };
      sendEmail(payload);
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
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      };

      const token = signToken(payload);

      res.status(200).json({ access_token: token, role: foundUser.role });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    // log buat ambil id token
    // console.log(req.body);

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);

    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const { email, given_name } = payload;

      const [user, created] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          name: given_name,
          password: (Math.random() + 1).toString(36).substring(4),
          role: "User",
        },
      });

      const dataMailer = {
        subject: "Welcome to BIMBLE",
        email: user.email,
        text: `
					Hello ${user.name} ${user.email}!
					<br/>
					Thank you for joining Bimble,
					Enjoy your stay here!`,
      };

      sendEmail(dataMailer);

      const access_token = signToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      res.status(201).json({
        access_token,
        role: user.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async readUser(req, res, next) {
    try {
      const response = await User.findOne({
        where: {
          email: req.user.email,
        },
        attributes: {
          exclude: ["id", "password", "updatedAt", "createdAt"],
        },
        order: [["id", "DESC"]],
      });

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { name, email } = req.body;

      await User.update(
        {
          name,
          email,
        },
        {
          where: { email: req.user.email },
          returning: true,
        }
      );

      res.status(200).json({ message: "User has been updated" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PublicUserController;
