const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const app = express();

const sequelize = require("./src/database/index.js");

const path = require("path");

//Importation routes
const postRoutes = require("./src/routes/post");
const commentRoutes = require("./src/routes/comment");
const userRoutes = require("./src/routes/user");
const likeRoutes = require("./src/routes/like");
const logRoutes = require("./src/routes/log");
const signalRoutes = require("./src/routes/signal");

app.use(helmet());

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
// sequelize.initDbtwo();

//ROUTES

app.use("/images", express.static(path.join(__dirname, "images")));

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

module.exports = app;
