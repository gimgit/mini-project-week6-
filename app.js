const express = require("express");
const app = express();

const connect = require("./schemas");
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Todo = require("./routers/todo");
app.use("/api", Todo);

app.listen(8080, () => {
  console.log("server opened successfully");
});
