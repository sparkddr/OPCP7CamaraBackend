const Sequelize = require("sequelize");

const sequelize = new Sequelize("groupomania", "root", 'CapibaraBaracuda2909', {
    host : '127.0.0.1', 
    dialect: "mysql"})

try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }


module.exports = sequelize