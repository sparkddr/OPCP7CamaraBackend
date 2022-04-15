const sequelize = require("./connection");
const bcrypt = require("bcrypt");

const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");
const Like = require("./models/like");
const SignalPost = require("./models/signalPost");
const SignalComment = require("./models/signalComment");

const users = require("./mock-test/mock-user.js");
const posts = require("./mock-test/mock-post.js");
const comments = require("./mock-test/mock-comments.js");

User.hasMany(SignalPost);
SignalPost.belongsTo(User);
Post.hasMany(SignalPost);
SignalPost.belongsTo(Post);

User.hasMany(SignalComment);
SignalComment.belongsTo(User);
Comment.hasMany(SignalComment);
SignalComment.belongsTo(Comment);

const initDb = () => {
  sequelize
    .sync({ force: true })
    .then((result) => {
      users.map((user) => {
        bcrypt.hash(user.password, 10).then((hash) => {
          User.create({
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            role: user.role,
            admin: user.admin,
            password: hash,
            profilpic: user.profilpic,
          }).then((cam) => console.log(cam.toJSON()));
        });
      });
    })
    .then(() => {
      posts.map((post) => {
        Post.create({
          message: post.message,
        }).then((old) => console.log(old.toJSON()));
      });

      comments.map((comment) => {
        Comment.create({
          message: comment.message,
        }).then((yes) => console.log(yes.toJSON()));
      });
    });
};

module.exports = {
  initDb,
  User,
  Post,
  Comment,
  Like,
  SignalComment,
  SignalPost,
};

/*.then((user) => {
    console.log("First User created", user);
    return user.createPost({ message: "le  message de mon post" });
  })
  .then((post) => {
    console.log("First Post created", post);
  })
  .catch((err) => {
    console.log(err);
  });
*/
