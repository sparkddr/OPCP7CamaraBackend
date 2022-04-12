const User = require("../database/models/user");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    User.findAll().then((users) => {
      const message = "La Liste des utilisateurs a bien été récupérée.";
      res.json({ message, data: users });
    });
  });
};
