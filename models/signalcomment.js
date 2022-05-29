"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SignalComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.SignalComment.belongsTo(models.User, { as: "user" });
      models.SignalComment.belongsTo(models.Comment, { as: "comment" });
    }
  }
  SignalComment.init(
    {
      message: DataTypes.TEXT,
      UserId: DataTypes.NUMBER,
      CommentId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "SignalComment",
    }
  );
  return SignalComment;
};
