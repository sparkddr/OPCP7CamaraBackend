"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Post, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.User.hasMany(models.Like, {
        foreignKey: { name: "userId" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.User.hasMany(models.Comment, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.User.hasMany(models.SignalPost, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
      });
      models.User.hasMany(models.SignalComment, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      profilpic: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
