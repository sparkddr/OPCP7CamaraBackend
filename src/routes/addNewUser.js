const { User } = require("../database/index");

module.exports = (app) => {
  app.post("/api/users", (req, res) => {
    User.create(req.body)
      .then((user) => {
        const message = `L'utilisateur ${req.body.firstname} a bien été créé.`;
        res.json({ message, data: user });
      })
      .catch((error) => {
        const message =
          "L'utilisateur n'a pas pu être ajouté, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};
