'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCourse.belongsTo(models.User, { foreignKey: 'UserId' })
      UserCourse.belongsTo(models.Course, { foreignKey: 'CourseId' })
    }
  };
  UserCourse.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: `User can't be empty` },
        notNull: { msg: `User can't be empty` }
      }
    },

    CourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Course can't be empty` },
        notNull: { msg: `Course can't be empty` }
      }
    },

    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: { msg: `IsPaid can't be empty` },
        notNull: { msg: `IsPaid can't be empty` }
      }
    },

    chargeId: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};