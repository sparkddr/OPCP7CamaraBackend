const db = require("../../models/index");
const Comment = db.Comment;
const User = db.User;
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
  if (req.query.postId) {
    const postId = req.query.postId;
    return Comment.findAll({ where: { postId: postId } }).then((comments) => {
      const message = `Il y a ${comments.length} sur ce post `;
      res.json({ message, data: comments });
    });
  } else {
    Comment.findAll()
      .then((comments) => {
        const message = "La Liste des comments a bien été récupérée.";
        res.json({ message, data: comments });
      })
      .catch((error) => {
        const message = `La liste des comments n'a pas pu être récupéree. Réessayer dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  }
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
  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (comment === null) {
        const message =
          "Le comment n'a pas été retrouvé, merci de réessayer plus tard";
        return res.status(404).json({ message });
      }
      const commentModify = comment;
      User.findByPk(req.auth.userId).then((user) => {
        if (user.admin || commentModify.userId === user.id) {
          return Comment.update(req.body, {
            where: { id: commentModify.id },
          }).then(() => {
            return Comment.findByPk(id).then((comment) => {
              const message = `le comment n° ${commentModify.id} a bien été modifié.`;
              res.json({ message, data: comment });
            });
          });
        } else {
          return res.status(401).json({ error: "Requète non autorisée ! " });
        }
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
      User.findByPk(req.auth.userId).then((user) => {
        if (user.admin || comment.userId === user.id) {
          return Comment.destroy({
            where: { id: comment.id },
          }).then(() => {
            const message = `le comment n° ${commentDeleted.id} a bien été supprimé.`;
            res.json({ message, data: commentDeleted });
          });
        } else {
          return res.status(401).json({ error: "Requète non autorisée ! " });
        }
      });
    })
    .catch((error) => {
      const message =
        "Le comment n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
