const express = require("express");
const app = express();
const path = require("path");

const connect = require("./schemas");
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Router = require("./routers/route");
app.use("/api", Router);

app.listen(8080, () => {
  console.log("server opened successfully");
});
