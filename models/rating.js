'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating.belongsTo(models.User, { foreignKey: "UserId" });
			Rating.belongsTo(models.Course, { foreignKey: "CourseId" });
    }
  };
  Rating.init({
    rating: {
      type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Rating can't be empty` },
					notNull: { msg: `Rating can't be empty` },
          max: {
            args: 5,
            msg: "Maximal rating is only 10"
          }
				},
    },

    UserId: {
      type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: { msg: `User can't be empty` },
					notNull: { msg: `User can't be empty` },
				},
    },

    CourseId: {
      type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: { msg: `Course can't be empty` },
					notNull: { msg: `Course can't be empty` },
				},
    }
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};