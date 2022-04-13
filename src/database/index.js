const sequelize = require("./connection");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");
const users = require("./mock-test/mock-user.js");
const posts = require("./mock-test/mock-post.js");
const comments = require("./mock-test/mock-comments.js");

User.hasMany(Post);
User.hasMany(Comment);
Post.hasMany(Comment);

const initDb = () => {
  sequelize.sync({ force: true }).then((result) => {
    users.map((user) => {
      User.create({
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email,
        role: user.role,
        admin: user.admin,
        profilpic: user.profilpic,
      }).then((cam) => console.log(cam.toJSON()));
    });
    posts.map((post) => {
      Post.create({
        message: post.message,
        userId: post.userId,
      }).then((cam) => console.log(cam.toJSON()));
    });
    comments.map((comment) => {
      Comment.create({
        message: comment.message,
        userId: comment.userId,
        postId: comment.postId,
      }).then((cam) => console.log(cam.toJSON()));
    });
  });
};

module.exports = { initDb, User, Post, Comment };

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
