'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: `Users`,
          key: `id`
        },
        onUpdate: `CASCADE`,
        onDelete: `CASCADE`
      },
      CourseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: `Courses`,
          key: `id`
        },
        onUpdate: `CASCADE`,
        onDelete: `CASCADE`
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      chargeId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserCourses');
  }
};