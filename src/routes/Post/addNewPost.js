const { Post } = require("../../database/index");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.post("/api/posts", (req, res) => {
    Post.create(req.body)
      .then((post) => {
        const message = `Le post ${req.body.message} a bien été créé.`;
        res.json({ message, data: post });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le post n'a pas pu être créé, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
