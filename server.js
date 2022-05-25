const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Wllld!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/*app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);*/
