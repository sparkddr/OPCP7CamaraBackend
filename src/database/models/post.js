const Sequelize = require("sequelize")
const sequelize = require("../connection")

const Post = sequelize.define("post",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull:false,
        primaryKey : true
    },
    message : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    utilisateur_id : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
})

module.exports = Post ; 