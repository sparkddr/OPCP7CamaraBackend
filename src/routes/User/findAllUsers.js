const { User } = require("../../database/index");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
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
  });
};
