const { User } = require("../database/index");

module.exports = (app) => {
  app.delete("/api/users/:id", (req, res) => {
    User.findByPk(req.params.id)
      .then((user) => {
        if (user === null) {
          const message =
            "L'utilisateur n'a pas été retrouvé, merci de réessayer plus tard";
          return res.status(404).json({ message });
        }
        const userDeleted = user;
        return User.destroy({
          where: { id: user.id },
        }).then(() => {
          const message = `l'utilisateur n° ${userDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
