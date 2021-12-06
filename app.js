const express = require("express");
const app = express();
const connect = require("./models/dbConnect");
connect();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("Hello Express!");
});


app.listen(3000, () => {
    console.log("서버가 열렸습니다!");
});
