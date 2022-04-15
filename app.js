const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const app = express();

const sequelize = require("./src/database/index.js");

//Importation routes
const postRoutes = require("./src/routes/post");
const commentRoutes = require("./src/routes/comment");
const userRoutes = require("./src/routes/user");
const likeRoutes = require("./src/routes/like");
const logRoutes = require("./src/routes/log");
const signalRoutes = require("./src/routes/signal");

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

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api", logRoutes);
app.use("/api", signalRoutes);

//CONNECTION

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
