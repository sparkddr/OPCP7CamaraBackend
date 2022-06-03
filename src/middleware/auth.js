const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const privateKey = process.env.PRIVATEKEY;

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message =
      "Vous n'avez pas fourni de jeton d'authentification. Ajoutez en un dans l'en tête de la requète.";
    return res.status(401).json({ message });
  }

  const token = authorizationHeader.split(" ")[1];
  jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const message =
        "L'utilisateur n'est pas autorisé à accéder à cette ressource.";
      return res.status(401).json({ message, data: error });
    }
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      const message = "L'identifiant de l'utilisateur est invalide";
      res.status(401).json({ message });
    } else {
      next();
    }
  });
};
