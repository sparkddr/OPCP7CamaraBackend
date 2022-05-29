const sequelize = require("./connection");

const initDb = () => {
  sequelize.sync();
};

module.exports = {
  initDb,
};
