const Sequelize = require("sequelize");
const sequelize = require("../connection");

const User = require("./user");
const Post = require("./post");

const Like = sequelize.define(
  "like",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

User.hasMany(Like);
Like.belongsTo(User);

Post.hasMany(Like);
Like.belongsTo(Post);

module.exports = Like;
