'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating: {
        allowNull: false,
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
    await queryInterface.dropTable('Ratings');
  }
};