const Sequelize = require("sequelize")
const sequelize = require("../connection")

const User = sequelize.define("user",{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull:false,
        primaryKey : true
    },
    lastname : {
        type : Sequelize.STRING,
        allowNull : false
    },
    firstname : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    role : {
        type : Sequelize.STRING,
        allowNull : false
    },
    admin : {
        type : Sequelize.BOOLEAN,
        default : false,
        allowNull : false
    },
    profilpic : {
        type : Sequelize.STRING,
        default : 'ok',
        allowNull : false
    },
})

module.exports = User ; 