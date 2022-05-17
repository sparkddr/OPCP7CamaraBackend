const Sequelize = require("sequelize");
const sequelize = require("../connection");
const User = require("./user");

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
  pictureurl: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

User.hasMany(Post, { onDelete: "CASCADE", onUpdate: "CASCADE" });
Post.belongsTo(User);

module.exports = Post;
