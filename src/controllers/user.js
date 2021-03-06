const db = require("../../models/index");
const User = db.User;

const { Op } = require("sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");

exports.findAllUsers = (req, res) => {
  if (req.query.firstname) {
    const firstname = req.query.firstname;
    if (firstname.length < 2) {
      return res
        .status(400)
        .json("La recherche doit contenir au minimum deux caractères");
    }
    return User.findAll({
      where: { firstname: { [Op.like]: `%${firstname}%` } },
    }).then((users) => {
      const message = `Il y a ${users.length} qui correspondent au terme de recherche ${firstname}`;
      res.json({ message, data: users });
    });
  }
  User.findAll({ order: ["firstname"] })
    .then((users) => {
      const message = "La Liste des utilisateurs a bien été récupérée.";
      res.json({ message, data: users });
    })
    .catch((error) => {
      const message = `La liste des utilisateurs n'a pas pu être récupéree. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};

exports.findOneUser = (req, res) => {
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
};

exports.updateUser = (req, res) => {
  console.log("Hello");
  const id = JSON.parse(req.params.id);
  const userUpdate = (userData) => {
    User.update(userData, {
      where: { id: id },
    })
      .then(() => {
        console.log(userData);
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
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message =
          "L'utilisateur n'a pas pu être modifié, Merci de réessayer un peu plus tard";
        res.status(500).json({ message, data: error });
      });
  };
  if (req.file) {
    const userData = JSON.parse(req.body.user);
    if (userData.password) {
      bcrypt.hash(userData.password, 10).then((hash) => {
        const data = { ...req.body, password: hash };
        userUpdate(data);
      });
    } else {
      const data = {
        ...JSON.parse(req.body.user),
        profilpic: `${req.protocol}://${req.get("host")}/images/save/${
          req.file.filename
        }`,
      };
      userUpdate(data);
    }
  } else {
    const userData = JSON.parse(req.body.user);
    if (userData.password) {
      console.log(userData);
      bcrypt.hash(userData.password, 10).then((hash) => {
        const data = { ...userData, password: hash };
        userUpdate(data);
      });
    } else {
      userUpdate(userData);
    }
  }
};

exports.deleteUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        const message =
          "L'utilisateur n'a pas été retrouvé, merci de réessayer plus tard";
        return res.status(404).json({ message });
      }
      const userDeleted = user;
      User.findByPk(req.auth.userId).then((userAuth) => {
        if (userAuth.admin || userDeleted.id === userAuth.id) {
          return User.destroy({
            where: { id: userAuth.id },
          }).then(() => {
            const message = `le post n° ${postDeleted.id} a bien été supprimé.`;
            res.json({ message, data: postDeleted });
          });
        } else {
          return res.status(401).json({ error: "Requète non autorisée ! " });
        }
      });
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
