const db = require("../../models/index");
const User = db.User;

module.exports = (req, res, next) => {
  User.findByPk(req.auth.userId).then((user) => {
    if (user.admin) {
      next();
    } else {
      return res
        .status(401)
        .json({ error: new Error("Requète non autorisée ! ") });
    }
  });
};
