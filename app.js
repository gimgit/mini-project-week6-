const express = require("express");
const app = express();
const connect = require("./models/dbConnect");
connect();
const router = require("./router/router");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", router);


app.listen(3000, () => {
    console.log("서버가 열렸습니다!");
});
