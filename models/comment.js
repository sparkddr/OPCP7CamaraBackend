"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User);
      models.Comment.belongsTo(models.Post);
      models.Comment.hasMany(models.SignalComment, { onDelete: "CASCADE" });
    }
  }
  Comment.init(
    {
      message: DataTypes.TEXT,
      userId: DataTypes.NUMBER,
      postId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
