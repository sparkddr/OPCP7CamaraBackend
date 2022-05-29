const bcrypt = require("bcrypt");
// const { User } = require("../database");
const db = require("../../models/index");
const User = db.User;
const jwt = require("jsonwebtoken");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.PRIVATEKEY;

exports.login = (req, res) => {
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
};

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      ...req.body,
      password: hash,
    })
      .then((user) => {
        const message = `L'utilisateur ${req.body.firstname} a bien été créé.`;
        res.json({ message, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "L'utilisateur n'a pas pu être ajouté, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  });
};

/*User.create(req.body)
    .then((user) => {
      const message = `L'utilisateur ${req.body.firstname} a bien été créé.`;
      res.json({ message, data: user });
    })*/
