"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le prénom ne peut pas être vide" },
          notNull: { msg: "Le prénom est une propriété requise" },
        },
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide" },
          notNull: { msg: "Le nom est une propriété requise" },
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
      },
      profilpic: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
