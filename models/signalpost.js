"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SignalPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SignalPost.belongsTo(models.User, { as: "user" });
      models.SignalPost.belongsTo(models.Post, { as: "post" });
    }
  }
  SignalPost.init(
    {
      message: DataTypes.TEXT,
      userId: DataTypes.NUMBER,
      postId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "SignalPost",
    }
  );
  return SignalPost;
};
