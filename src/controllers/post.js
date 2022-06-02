const db = require("../../models/index");
const Post = db.Post;
const Comment = db.Comment;
const User = db.User;
const { ValidationError } = require("sequelize");

exports.addNewPost = (req, res) => {
  const createPost = (dataPost) => {
    Post.create(dataPost)
      .then((post) => {
        const message = `Le post ${dataPost.message} a bien été créé et ajouté à a liste.`;
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
  if (req.file) {
    console.log("Fichier file");
    const data = {
      ...JSON.parse(req.body.post),
      pictureurl: `${req.protocol}://${req.get("host")}/images/save/${
        req.file.filename
      }`,
    };
    console.log(data);
    createPost(data);
  } else {
    console.log("Pas de fichier file");
    const postData = JSON.parse(req.body.post);
    console.log(postData);
    createPost(postData);
  }
};

exports.findAllPost = (req, res) => {
  if (req.query.userid) {
    const userId = req.query.userid;
    return Post.findAll({ where: { userId: userId } }).then((posts) => {
      const message =
        "La Liste des posts de l'utilisateur  a bien été récupérée.";
      res.json({ message, data: posts });
    });
  }
  Post.findAll({ /* order: [["createdAt", "DESC"]], */ include: Comment })
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
      User.findByPk(req.auth.userId).then((user) => {
        if (user.admin || post.userId === user.id) {
          return Post.destroy({
            where: { id: post.id },
          }).then(() => {
            const message = `le post n° ${postDeleted.id} a bien été supprimé.`;
            res.json({ message, data: postDeleted });
          });
        } else {
          return res
            .status(401)
            .json({ error: new Error("Requète non autorisée ! ") });
        }
      });
    })
    .catch((error) => {
      const message =
        "Le post n'a pas pu être supprimé, Merci de réessayer un peu plus tard";
      res.status(500).json({ message, data: error });
    });
};
