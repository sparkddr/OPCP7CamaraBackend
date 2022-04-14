const { Comment } = require("../database/index");
const { ValidationError } = require("sequelize");

exports.newComment = (req, res) => {
  Comment.create(req.body)
    .then((comment) => {
      const message = `Le comment ${req.body.message} a bien été créé.`;
      res.json({ message, data: comment });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le comment n'a pas pu être créé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.findAllComment = (req, res) => {
  Comment.findAll()
    .then((comments) => {
      const message = "La Liste des comments a bien été récupérée.";
      res.json({ message, data: comments });
    })
    .catch((error) => {
      const message = `La liste des comments n'a pas pu être récupéree. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};

exports.findOneComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      console.log(comment);
      if (comment === null) {
        const message =
          "Le comment demandé n'existe pas. Réessayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      const message = "Le comment a été trouvé";
      res.json({ message, data: comment });
    })
    .catch((error) => {
      const message =
        "Le comment n'a pas été trouvé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.updateComment = (req, res) => {
  const id = req.params.id;
  Comment.update(req.body, {
    where: { id: id },
  })
    .then(() => {
      return Comment.findByPk(id).then((comment) => {
        if (comment === null) {
          const message =
            "Le comment demandé n'existe pas . Réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        const message = "Le comment a bien été modifié";
        res.json({ message, data: comment });
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le comment n'a pas pu être modifié, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.deleteComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (comment === null) {
        const message =
          "Le comment n'a pas été retrouvé, merci de réessayer plus tard";
        return res.status(404).json({ message });
      }
      const commentDeleted = comment;
      return Comment.destroy({
        where: { id: comment.id },
      }).then(() => {
        const message = `le comment n° ${commentDeleted.id} a bien été supprimé.`;
        res.json({ message, data: commentDeleted });
      });
    })
    .catch((error) => {
      const message =
        "Le comment n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
