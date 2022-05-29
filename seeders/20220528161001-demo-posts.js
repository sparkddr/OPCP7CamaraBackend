"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "POSTS",
      [
        {
          id: 1,
          message: "Bonjour à tous et bienvenue",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          message: "Hello tout le monde comment ça va?",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          message: "Salut regardez cette vidéo elle est incroyable",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          message:
            "Je vous transmets les dernières infos concernant la mise en place de la nouvelle salle. Est ce que certaines personnes seraient dispo pour venir m'aider à installer l'endroit pour la fête d'inauguration?",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("POSTS", null, {});
  },
};
