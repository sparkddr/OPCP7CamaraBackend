const { Comment } = require("../../database/index");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/comments", (req, res) => {
    Comment.findAll()
      .then((comments) => {
        const message = "La Liste des comments a bien été récupérée.";
        res.json({ message, data: comments });
      })
      .catch((error) => {
        const message = `La liste des comments n'a pas pu être récupéree. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
