const dotenv = require("dotenv");
const db = require("../../models/index");

dotenv.config();

const initDb = () => {
  // const sequelize = new Sequelize(
  //   process.env.DB_DATABASE,
  //   process.env.DB_USERNAME,
  //   process.env.DB_PASSWORD,
  //   {
  //     host: "127.0.0.1",
  //     useSSL: false,
  //     dialect: "mysql",
  //   }
  // );

  db.sequelize
    .authenticate()
    .then(() => console.log("Connection has been established successfully."))
    .catch((err) => console.error("Unable to connect to the database:", error));
};

module.exports = {
  initDb,
};
