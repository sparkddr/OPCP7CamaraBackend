const { Post } = require("../database/index");
const { ValidationError } = require("sequelize");

exports.addNewPost = (req, res) => {
  Post.create(req.body)
    .then((post) => {
      const message = `Le post ${req.body.message} a bien été créé.`;
      res.json({ message, data: post });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le post n'a pas pu être créé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.findAllPost = (req, res) => {
  Post.findAll()
    .then((posts) => {
      const message = "La Liste des posts a bien été récupérée.";
      res.json({ message, data: posts });
    })
    .catch((error) => {
      const message = `La liste des posts n'a pas pu être récupéree. Réessayer dans quelques instants.`;
      res.status(500).json({ message, data: error });
    });
};

exports.findOnePost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      console.log(post);
      if (post === null) {
        const message =
          "Le post demandé n'existe pas. Réessayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      const message = "Le post a été trouvé";
      res.json({ message, data: post });
    })
    .catch((error) => {
      const message =
        "Le post n'a pas été trouvé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.updatePost = (req, res) => {
  const id = req.params.id;
  Post.update(req.body, {
    where: { id: id },
  })
    .then(() => {
      return Post.findByPk(id).then((post) => {
        if (post === null) {
          const message =
            "Le post demandé n'existe pas . Réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        const message = "Le post a bien été modifié";
        res.json({ message, data: post });
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "Le post n'a pas pu être modifié, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};

exports.deletePost = (req, res) => {
  Post.findByPk(req.params.id)
    .then((post) => {
      if (post === null) {
        const message =
          "Le post n'a pas été retrouvé, merci de réessayer plus tard";
        return res.status(404).json({ message });
      }
      const postDeleted = post;
      return Post.destroy({
        where: { id: post.id },
      }).then(() => {
        const message = `le post n° ${postDeleted.id} a bien été supprimé.`;
        res.json({ message, data: postDeleted });
      });
    })
    .catch((error) => {
      const message =
        "Le post n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
