const express = require("express");
const app = express();

const connect = require("./schemas");
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Router = require("./routers/route");
app.use("/api", Router);

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();

const circles_date = "2021-12-8";
const circles_date_year = circles_date.split("-")[0];
const circles_date_month = circles_date.split("-")[1] - 1;
const circles_date_date = circles_date.split("-")[2];

const today_time = new Date(year, month, date);
let circles_time = new Date(
  circles_date_year,
  circles_date_month,
  circles_date_date
);

console.log(
  `Circle 날짜 : ${circles_time} // ${circles_time.getTime()}, 오늘 날짜 : ${today_time} //  ${today_time.getTime()}`
);

app.listen(8080, () => {
  console.log("server opened successfully");
});
