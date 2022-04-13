const Sequelize = require("sequelize");
const sequelize = require("../connection");

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
  userId: {
    type: Sequelize.INTEGER,
  },
  postId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Comment;
