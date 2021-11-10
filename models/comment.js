'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'UserId' })
      Comment.belongsTo(models.Video, { foreignKey: 'VideoId' })
    }
  };
  Comment.init({
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Comment can't be empty` },
        notNull: { msg: `Comment can't be empty` }
      }
    },

    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: `User can't be empty` },
        notNull: { msg: `User can't be empty` }
      }
    },

    VideoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: `Video can't be empty` },
        notNull: { msg: `Video can't be empty` }
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};