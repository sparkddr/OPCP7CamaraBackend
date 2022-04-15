const Sequelize = require("sequelize");
const sequelize = require("../connection");
const User = require("./user");
const Post = require("./post");

const SignalPost = sequelize.define(
  "signalPost",
  {
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
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

module.exports = SignalPost;
