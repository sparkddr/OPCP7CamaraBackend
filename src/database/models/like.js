const Sequelize = require("sequelize");
const sequelize = require("../connection");

const Like = sequelize.define(
  "like",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timesamps: true,
    updatedAt: false,
  }
);

module.exports = Like;
