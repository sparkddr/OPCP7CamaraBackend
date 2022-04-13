const { User } = require("../../database/index");

module.exports = (app) => {
  app.get("/api/users/:id", (req, res) => {
    User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) {
          const message =
            "L'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        const message = "L'utilisateur a été trouvé";
        res.json({ message, data: user });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas été trouvé, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
