const { Comment } = require("../../database/index");

module.exports = (app) => {
  app.delete("/api/comments/:id", (req, res) => {
    Comment.findByPk(req.params.id)
      .then((comment) => {
        if (comment === null) {
          const message =
            "Le comment n'a pas été retrouvé, merci de réessayer plus tard";
          return res.status(404).json({ message });
        }
        const commentDeleted = comment;
        return Comment.destroy({
          where: { id: comment.id },
        }).then(() => {
          const message = `le comment n° ${commentDeleted.id} a bien été supprimé.`;
          res.json({ message, data: commentDeleted });
        });
      })
      .catch((error) => {
        const message =
          "Le comment n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
