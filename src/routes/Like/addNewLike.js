const { Like } = require("../../database/index");

module.exports = (app) => {
  app.post("/api/likes", (req, res) => {
    Like.create(req.body)
      .then((like) => {
        const message = `Le like au post ${req.body.postId} a bien été créé.`;
        res.json({ message, data: like });
      })
      .catch((error) => {
        const message =
          "Le like n'a pas pu être ajouté, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
