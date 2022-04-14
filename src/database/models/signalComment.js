const Sequelize = require("sequelize");
const sequelize = require("../connection");
const User = require("./user");
const Comment = require("./comment");

const SignalComment = sequelize.define(
  "signalComment",
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

User.hasMany(SignalComment);
SignalComment.belongsTo(User);

Comment.hasMany(SignalComment);
SignalComment.belongsTo(Comment);

module.exports = SignalComment;
