const bcrypt = require("bcrypt");
const { User } = require("../database");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          const message = "L'utilisateur demandé n'existe pas";
          return res.status(404).json({ message });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = "Le mot de passe est incorrect.";
              return res.status(401).json({ message });
            }
            const message = "L'utilisateur a été connecté avec succès";
            return res.json({ message, data: user });
          });
      })
      .catch((err) => {
        const message =
          "L'utilisateur n'a pas pu être connecté . Réessayez dans quelqeus instants.";
        return res.json({ message, data: err });
      });
  });
};
