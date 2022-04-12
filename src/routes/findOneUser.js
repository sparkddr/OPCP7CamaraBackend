const User = require("../database/models/user");

module.exports = (app) => {
  app.get("/api/users/:id", (req, res) => {
    User.findByPk(req.params.id).then((user) => {
      const message = "L'utilisateur a été trouvé";
      res.json({ message, data: user });
    });
  });
};
