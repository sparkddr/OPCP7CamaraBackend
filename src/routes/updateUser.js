const { User } = require("../database/index");

module.exports = (app) => {
  app.put("/api/users/:id", (req, res) => {
    const id = req.paramas.id;
    User.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return User.findByPk(id).then((user) => {
          if (user === null) {
            const message =
              "L'utilisateur demandé n'existe pas . Réessayer avec un autre identifiant";
            return res.status(404).json({ message });
          }
          const message = "L'utilisateur a bien été modifié";
          res.json({ message, data: user });
        });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être modifié, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
