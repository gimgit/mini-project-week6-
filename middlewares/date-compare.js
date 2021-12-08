const circles = require("../models/circles");

module.exports = async (req, res, next) => {
  const { circles_id } = req.body;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const circles_date = await circles.findOne({ circles_id: circles_id })
    .circles_date;
  const [circles_date_year, circles_date_month, circles_date_date] =
    circles_date.split("-");

  const today_time = new Date(year, month, date).getTime();
  const circles_time = new Date(
    circles_date_year,
    circles_date_month - 1,
    circles_date_date
  ).getTime();

  if (circles_time < today_time) {
    return res.status(412).send({
      errorMessage: "이전 날짜의 TodoList는 수정할 수 있습니다.",
    });
  }

  next();
};
