const { Comment } = require("../../database/index");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/comments/:id", (req, res) => {
    const id = req.params.id;
    Comment.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return Comment.findByPk(id).then((comment) => {
          if (comment === null) {
            const message =
              "Le comment demandé n'existe pas . Réessayer avec un autre identifiant";
            return res.status(404).json({ message });
          }
          const message = "Le comment a bien été modifié";
          res.json({ message, data: comment });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le comment n'a pas pu être modifié, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
