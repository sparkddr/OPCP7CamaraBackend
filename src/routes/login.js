const bcrypt = require("bcrypt");
const { User } = require("../database");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

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
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "24h",
            });
            const message = "L'utilisateur a été connecté avec succès";
            return res.json({ message, data: user, token });
          });
      })
      .catch((err) => {
        const message =
          "L'utilisateur n'a pas pu être connecté . Réessayez dans quelqeus instants.";
        return res.json({ message, data: err });
      });
  });
};
