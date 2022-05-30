const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();

//Importation routes
const postRoutes = require("./src/routes/post");
const commentRoutes = require("./src/routes/comment");
const userRoutes = require("./src/routes/user");
const likeRoutes = require("./src/routes/like");
const logRoutes = require("./src/routes/log");
const signalRoutes = require("./src/routes/signal");
const db = require("./models/index");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());

app
  .use(favicon(__dirname + "/src/utils/favicon.ico"))
  .use(morgan("dev"))
  .use(express.json());

//DB Connection
db.sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", error));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

//ROUTES

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api", apiLimiter, logRoutes);
app.use("/api", signalRoutes);

//CONNECTION

//Gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

module.exports = app;
