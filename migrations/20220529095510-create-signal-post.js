"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("signalPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          as: "user",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          as: "post",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      message: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("signalPosts");
  },
};