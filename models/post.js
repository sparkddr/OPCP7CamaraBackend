"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.hasMany(models.Comment, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Post.hasMany(models.SignalPost, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Post.hasMany(models.Like, {
        foreignKey: { name: "postId" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      message: DataTypes.TEXT,
      userId: DataTypes.NUMBER,
      pictureurl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
