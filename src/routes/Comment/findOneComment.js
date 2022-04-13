const { Comment } = require("../../database/index");

module.exports = (app) => {
  app.get("/api/comments/:id", (req, res) => {
    Comment.findByPk(req.params.id)
      .then((comment) => {
        console.log(comment);
        if (comment === null) {
          const message =
            "Le comment demandé n'existe pas. Réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        const message = "Le comment a été trouvé";
        res.json({ message, data: comment });
      })
      .catch((error) => {
        const message =
          "Le comment n'a pas été trouvé, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
