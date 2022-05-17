const Sequelize = require("sequelize");
const sequelize = require("../connection");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le nom ne peut pas être vide" },
      notNull: { msg: "Le nom est une propriété requise" },
    },
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Le prénom ne peut pas être vide" },
      notNull: { msg: "Le prénom est une propriété requise" },
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: { msg: "Cet email  est déja utilisé " },
    validate: {
      isEmail: { msg: "Merci de renseigner  votre Email" },
      notNull: { msg: "Merci de renseigner  votre Email" },
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  profilpic: {
    type: Sequelize.STRING,
    defaultValue: "http://localhost:8000/images/init/user_icon_color.png",
    allowNull: false,
  },
});

module.exports = User;
