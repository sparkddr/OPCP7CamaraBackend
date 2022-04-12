const app = require("./app");
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Wllld!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/*app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);*/
