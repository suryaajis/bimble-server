"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Course extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Course.belongsToMany(models.User, { through: `UserCourses`, foreignKey: `CourseId` });
			Course.belongsTo(models.Category, { foreignKey: "CategoryId" });
			Course.hasMany(models.Video, { foreignKey: "CourseId" });
		}
	}
	Course.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: { msg: `Name must be unique` },
				validate: {
					notEmpty: { msg: `Name can't be empty` },
					notNull: { msg: `Name can't be empty` },
				},
			},

			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Description can't be empty` },
					notNull: { msg: `Description can't be empty` },
				},
			},

			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Price can't be empty` },
					notNull: { msg: `Price can't be empty` },
				},
			},

			thumbnailUrl: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Thumbnail URL can't be empty` },
					notNull: { msg: `Thumbnail URL can't be empty` },
				},
			},

			difficulty: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Difficulty can't be empty` },
					notNull: { msg: `Difficulty can't be empty` },
				},
			},

			status: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Status can't be empty` },
					notNull: { msg: `Status can't be empty` },
				},
			},

			rating: {
				type: DataTypes.INTEGER,
			},

			CategoryId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Category can't be empty` },
					notNull: { msg: `Category can't be empty` },
				},
			},
		},
		{
			sequelize,
			modelName: "Course",
		}
	);
	return Course;
};
