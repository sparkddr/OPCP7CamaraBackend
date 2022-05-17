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
const signalPost = require("./mock-test/mock-signalPost.js");

User.hasMany(SignalPost, { onDelete: "NO ACTION", onUpdate: "CASCADE" });
SignalPost.belongsTo(User);
Post.hasMany(SignalPost, { onDelete: "CASCADE" });
SignalPost.belongsTo(Post);

User.hasMany(SignalComment, { onDelete: "NO ACTION", onUpdate: "CASCADE" });
SignalComment.belongsTo(User);
Comment.hasMany(SignalComment, { onDelete: "CASCADE" });
SignalComment.belongsTo(Comment);

const initDb = () => {
  sequelize
    .sync({ force: true })
    .then(() => {
      users.map((user) => {
        User.create({
          lastname: user.lastname,
          firstname: user.firstname,
          email: user.email,
          role: user.role,
          admin: user.admin,
          password: user.password,
          profilpic: user.profilpic,
        });
      });
    })
    .then((res) => {
      posts.map((post) => {
        Post.create({
          id: post.id,
          message: post.message,
          userId: post.userId,
        }).then((old) => console.log(old.toJSON()));
      });
      comments.map((comment) => {
        Comment.create({
          message: comment.message,
          userId: comment.userId,
          postId: comment.postId,
        }).then((yes) => console.log(yes.toJSON()));
      });
    });
};

// signalPost.map((signal) => {
//   SignalPost.create({
//     message: signal.message,
//     userId: signal.userId,
//     postId: signal.postId,
//   }).then((ok) => console.log(ok.toJSON()));
// });

// const initDb = () => {
//   sequelize
//     .sync({ force: true })
//     .then((result) => {
//       async function maptables() {
//         let user = users.map((user) => {
//           bcrypt.hash(user.password, 10).then((hash) => {
//             User.create({
//               lastname: user.lastname,
//               firstname: user.firstname,
//               email: user.email,
//               role: user.role,
//               admin: user.admin,
//               password: hash,
//               profilpic: user.profilpic,
//             }).then((cam) => console.log(cam.toJSON()));
//           });
//         });
//         let follow = await user;
//       }
//       maptables();
//     })
//     .then(() => {
// posts.map((post) => {
//   Post.create({
//     message: post.message,
//     userId: post.userId,
//   }).then((old) => console.log(old.toJSON()));
//       });
//     });
// };

// users.map((user) => {
//   bcrypt.hash(user.password, 10).then((hash) => {
//     User.create({
//       lastname: user.lastname,
//       firstname: user.firstname,
//       email: user.email,
//       role: user.role,
//       admin: user.admin,
//       password: hash,
//       profilpic: user.profilpic,
//     })
//       .then((cam) => console.log(cam.toJSON()))
//       .then(() => {
// posts.map((post) => {
//   Post.create({
//     message: post.message,
//     userId: post.userId,
//   }).then((old) => console.log(old.toJSON()));
//         });

// comments.map((comment) => {
//   Comment.create({
//     message: comment.message,
//     userId: comment.userId,
//     postId: comment.postId,
//   }).then((yes) => console.log(yes.toJSON()));
// });

// signalPost.map((signal) => {
//   SignalPost.create({
//     message: signal.message,
//     userId: signal.userId,
//     postId: signal.postId,
//   }).then((ok) => console.log(ok.toJSON()));
// });
//       });
//   });
// });

// module.exports = {
//   initDb,
// };
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
