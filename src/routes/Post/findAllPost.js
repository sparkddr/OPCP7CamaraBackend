const { Post } = require("../../database/index");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/posts", (req, res) => {
    Post.findAll()
      .then((posts) => {
        const message = "La Liste des posts a bien été récupérée.";
        res.json({ message, data: posts });
      })
      .catch((error) => {
        const message = `La liste des posts n'a pas pu être récupéree. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
