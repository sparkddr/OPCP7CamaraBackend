"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "COMMENTS",
      [
        {
          message: "C'est clair",
          userId: 2,
          postId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message: "Wtf",
          userId: 3,
          postId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message: "OMG",
          userId: 1,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          message: "Mais c'est complétement fou cette histoire ",
          userId: 1,
          postId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("COMMENTS", null, {});
  },
};
