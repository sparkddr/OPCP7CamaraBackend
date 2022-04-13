const { Post } = require("../../database/index");

module.exports = (app) => {
  app.delete("/api/posts/:id", (req, res) => {
    Post.findByPk(req.params.id)
      .then((post) => {
        if (post === null) {
          const message =
            "Le post n'a pas été retrouvé, merci de réessayer plus tard";
          return res.status(404).json({ message });
        }
        const postDeleted = post;
        return Post.destroy({
          where: { id: post.id },
        }).then(() => {
          const message = `le post n° ${postDeleted.id} a bien été supprimé.`;
          res.json({ message, data: postDeleted });
        });
      })
      .catch((error) => {
        const message =
          "Le post n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
