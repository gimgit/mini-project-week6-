const express = require("express");
const app = express();
const path = require("path");

const connect = require("./schemas");
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Router = require("./routers/route");
app.use("/api", Router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(8080, () => {
  console.log("server opened successfully");
});
