const Sequelize = require("sequelize");

const sequelize = new Sequelize("groupomania", "root", "CapibaraBaracuda2909", {
  host: "127.0.0.1",
  useSSL: false,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
