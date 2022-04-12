const sequelize = require("./connection");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");
const users = require("./mock-test/mock-user.js");

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
  });
};

module.exports = { initDb, User };

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
