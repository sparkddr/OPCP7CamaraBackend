const Sequelize = require("sequelize");
const sequelize = require("../connection");

const User = require("./user");
const Post = require("./post");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le message ne peut pas être vide" },
      notNull: { msg: "Le message est une propriété requise" },
    },
  },
});

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

module.exports = Comment;
