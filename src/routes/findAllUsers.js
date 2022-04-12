const { User } = require("../database/index");
module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    User.findAll()
      .then((users) => {
        const message = "La Liste des utilisateurs a bien été récupérée.";
        res.json({ message, data: users });
      })
      .catch((error) => {
        const message = `La liste des utilisateurs n'a pas pu être récupéree. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
