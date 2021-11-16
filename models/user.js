"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsToMany(models.Course, { through: `UserCourses`, foreignKey: `UserId` });
			User.hasMany(models.Comment, { foreignKey: `UserId` });
			User.hasMany(models.Rating, { foreignKey: `UserId` });
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Name can't be empty` },
					notNull: { msg: `Name can't be empty` },
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: { msg: `Email must be unique` },
				validate: {
					notEmpty: { msg: `Email can't be empty` },
					notNull: { msg: `Email can't be empty` },
					isEmail: { msg: `Wrong email format` },
				},
			},

			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: `Password can't be empty` },
					notEmpty: { msg: `Password can't be empty` },
					len: {
						args: [8, undefined],
						msg: "The password must contain minimal 8 characters.",
					},
				},
			},

			role: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: `Role can't be empty` },
					notEmpty: { msg: `Role can't be empty` },
				},
			},
		},
		{
			hooks: {
				beforeCreate: (instance, options) => {
					instance.password = hashPassword(instance.password);
				},
			},
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
