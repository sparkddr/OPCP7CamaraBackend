const db = require("../../models/index");
const SignalComment = db.SignalComment;
const SignalPost = db.SignalPost;
const User = db.User;
const Post = db.Post;
const { ValidationError } = require("sequelize");

exports.addNewSignalComment = (req, res) => {
  SignalComment.create(req.body)
    .then((signal) => {
      const message = `Le signalement ${req.body.message} a bien été créé.`;
      res.json({ message, data: signal });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le signalement n'a pas pu être créé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
exports.addNewSignalPost = (req, res) => {
  SignalPost.create(req.body)
    .then((signal) => {
      const message = `Le signalement ${req.body.message} a bien été créé.`;
      res.json({ message, data: signal });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le signalement n'a pas pu être créé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.findAllSignalComments = (req, res) => {
  SignalComment.findAll({ include: { all: true } })
    .then((posts) => {
      const message =
        "La Liste des signalements de commentaires a bien été récupérée.";
      res.json({ message, data: posts });
    })
    .catch((error) => {
      const message = `La liste des signalements de commentaires n'a pas pu être récupéree. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};

exports.findAllSignalPosts = (req, res) => {
  SignalPost.findAll({
    include: [
      { model: User, as: "user" },
      { model: Post, as: "post" },
    ],
  })
    .then((posts) => {
      console.log(posts);
      const message =
        "La Liste des signalements de posts a bien été récupérée.";
      res.json({ message, data: posts });
    })
    .catch((error) => {
      const message = `La liste des signalements de posts n'a pas pu être récupéree. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};

exports.findOneSignalPost = (req, res) => {
  SignalPost.findByPk(req.params.id)
    .then((post) => {
      console.log(post);
      if (post === null) {
        const message =
          "Le signalement demandé n'existe pas. Réessayer avec un autre id";
        return res.status(404).json({ message });
      }
      const message = "Le signalement de post a été trouvé";
      res.json({ message, data: post });
    })
    .catch((error) => {
      const message =
        "Le signalement n'a pas été trouvé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
exports.findOneSignalComment = (req, res) => {
  SignalComment.findByPk(req.params.id)
    .then((post) => {
      console.log(post);
      if (post === null) {
        const message =
          "Le signalement demandé n'existe pas. Réessayer avec un autre id";
        return res.status(404).json({ message });
      }
      const message = "Le signalement de commentaire a été trouvé";
      res.json({ message, data: post });
    })
    .catch((error) => {
      const message =
        "Le signalement n'a pas été trouvé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.deleteSignalComment = (req, res) => {
  SignalComment.findByPk(req.params.id)
    .then((post) => {
      if (post === null) {
        const message =
          "Le signalement de commentaire n'a pas été retrouvé, merci de réessayer plus tard";
        return res.status(404).json({ message });
      }
      const postDeleted = post;
      return SignalComment.destroy({
        where: { id: post.id },
      }).then(() => {
        const message = `le signalement n° ${postDeleted.id} a bien été supprimé.`;
        res.json({ message, data: postDeleted });
      });
    })
    .catch((error) => {
      const message =
        "Le signalement n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
exports.deleteSignalPost = (req, res) => {
  SignalPost.findByPk(req.params.id)
    .then((post) => {
      if (post === null) {
        const message =
          "Le signalement de commentaire n'a pas été retrouvé, merci de réessayer plus tard";
        return res.status(404).json({ message });
      }
      const postDeleted = post;
      return SignalPost.destroy({
        where: { id: post.id },
      }).then(() => {
        const message = `le signalement n° ${postDeleted.id} a bien été supprimé.`;
        res.json({ message, data: postDeleted });
      });
    })
    .catch((error) => {
      const message =
        "Le signalement n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
