const Sequelize = require("sequelize");
const sequelize = require("../connection");

const Post = sequelize.define("post", {
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
    allowNull: false,
  },
});

module.exports = Post;
