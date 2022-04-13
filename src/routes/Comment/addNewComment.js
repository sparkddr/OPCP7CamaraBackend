const { Comment } = require("../../database/index");
const { ValidationError } = require("sequelize");

module.exports = (app) => {
  app.post("/api/comments", (req, res) => {
    Comment.create(req.body)
      .then((comment) => {
        const message = `Le comment ${req.body.message} a bien été créé.`;
        res.json({ message, data: comment });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "Le comment n'a pas pu être créé, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
