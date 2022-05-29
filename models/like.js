"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.User, { foreignKey: { name: "userId" } });
      models.Like.belongsTo(models.Post, { foreignKey: { name: "postId" } });
    }
  }
  Like.init(
    { userId: DataTypes.NUMBER, postId: DataTypes.NUMBER },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
