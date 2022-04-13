const { Post } = require("../../database/index");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.put("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    Post.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return Post.findByPk(id).then((post) => {
          if (post === null) {
            const message =
              "Le post demandé n'existe pas . Réessayer avec un autre identifiant";
            return res.status(404).json({ message });
          }
          const message = "Le post a bien été modifié";
          res.json({ message, data: post });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le post n'a pas pu être modifié, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
