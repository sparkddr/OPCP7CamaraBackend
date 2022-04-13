const { Post } = require("../../database/index");

module.exports = (app) => {
  app.get("/api/posts/:id", (req, res) => {
    Post.findByPk(req.params.id)
      .then((post) => {
        console.log(post);
        if (post === null) {
          const message =
            "Le post demandé n'existe pas. Réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        const message = "Le post a été trouvé";
        res.json({ message, data: post });
      })
      .catch((error) => {
        const message =
          "Le post n'a pas été trouvé, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
