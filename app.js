const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const app = express();

const users = require("./src/database/mock-test/mock-user");
const { success } = require("./src/utils/helper");

const sequelize = require("./src/database/index.js");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app
  .use(favicon(__dirname + "/src/utils/favicon.ico"))
  .use(morgan("dev"))
  .use(express.json());

//DB Connection

sequelize.initDb();

//ROUTES

require("./src/routes/findAllUsers")(app);
require("./src/routes/findOneUser")(app);
require("./src/routes/addNewUser")(app);
require("./src/routes/updateUser")(app);

//Gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

/*app.get("/api/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  const message = "Un utilisateur a été trouvé";
  res.json(success(message, user));
});
app.get("/api/users", (req, res) => {
  const message = "Voici la liste des utilisateurs";
  res.json(success(message, users));
});
app.post("/api/user/:id", (req, res) => {
  const id = req.params.id;
});
app.put("/api/user/:id", (req, res) => {
  const id = req.params.id;
});
app.delete("/api/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userDelete = users.find((user) => user.id === id);
  users.filter((user) => user.id !== id);
  const message = `L'utilisateur ${userDelete.firstname} a bien été supprimé`;
  res.json(success(message, userDelete));
});*/

module.exports = app;
