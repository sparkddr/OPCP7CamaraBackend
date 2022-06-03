const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Wllld!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`Ready on ${process.env.NODE_ENV} mode `);
});
