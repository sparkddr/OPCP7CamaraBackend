const sequelize = require("./src/database/connection")
const User = require("./src/database/models/user")
const Post = require("./src/database/models/post")
const Comment = require("./src/database/models/comment")

User.hasMany(Post);
User.hasMany(Comment);
Post.hasMany(Comment);

sequelize
    .sync({force : true})
    .then((result)=>{  
    console.log(result);
})
    .catch((err)=>{
    console.log(err);
})