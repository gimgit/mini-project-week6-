const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
    "Access-Control-Allow-Origin":
        "http://test-go99.s3-website.ap-northeast-2.amazonaws.com/",
    "Access-Control-Request-Method": "POST, GET, DELETE, PATCH, PUT",
    "Access-Control-Request-Headers": "X-Custom-Header",
    credentials: true,
};

app.use(cors(corsOptions));

const connect = require("./models");
connect();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const user = require("./routers/user");
const projects = require("./routers/project");
const main = require("./routers/main");
const Todo = require("./routers/todo");
const circles = require("./routers/circles");

app.use("/api", user);
app.use("/api", projects);
app.use("/api", main);
app.use("/api", Todo);
app.use("/api", circles);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
