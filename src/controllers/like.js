const db = require("../../models/index");
const Like = db.Like;
const User = db.User;

exports.addNewLike = (req, res) => {
  Like.create(req.body)
    .then((like) => {
      const message = `Le like au post ${req.body.postId} a bien été créé.`;
      res.json({ message, data: like });
    })
    .catch((error) => {
      const message =
        "Le like n'a pas pu être ajouté, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.deleteLike = (req, res) => {
  Like.findByPk(req.params.id)
    .then((like) => {
      if (like === null) {
        const message =
          "Le like n'a pas été retrouvé, merci de réessayer plus tard";
        return res.status(404).json({ message });
      }
      const likeDeleted = like;
      User.findByPk(req.auth.userId).then((user) => {
        if (user.admin || likeDeleted.userId === user.id) {
          return Like.destroy({
            where: { id: like.id },
          }).then(() => {
            const message = `le like n° ${likeDeleted.id} au post ${likeDeleted.postId}a bien été supprimé.`;
            res.json({ message, data: likeDeleted });
          });
        } else {
          return res.status(401).json({ error: "Requète non autorisée ! " });
        }
      });
    })
    .catch((error) => {
      const message =
        "Le like n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.getPostLikes = (req, res) => {
  Like.findAll({
    where: {
      postId: req.params.id,
    },
  })
    .then((likes) => {
      const message = "La Liste des likes a bien été récupérée.";
      res.json({ message, data: likes });
    })
    .catch((error) => {
      const message = `La liste des likes n'a pas pu être récupéree. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};
