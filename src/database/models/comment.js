const Sequelize = require("sequelize")
const sequelize = require("../connection")

const Comment = sequelize.define("comment",{
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
    },
    post_id : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
})

module.exports = Comment ; 