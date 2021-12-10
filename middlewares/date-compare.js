const circles = require("../models/circles");

module.exports = async (req, res, next) => {
    const { circles_id } = req.body;

    console.log(req.body);

    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    const year = kr_curr.getFullYear();
    const month = kr_curr.getMonth() + 1;
    const date = kr_curr.getDate();

    const circles_date = await circles.findOne({ circles_id: circles_id });
    const [circles_date_year, circles_date_month, circles_date_date] =
        circles_date.circles_date.split("-");

    const today_time = new Date(year, month, date).getTime();
    const circles_time = new Date(
        circles_date_year,
        circles_date_month,
        circles_date_date
    ).getTime();

    if (circles_time < today_time) {
        return res.status(412).send({
            errorMessage: `이전 날짜의 TodoList는 수정할 수 있습니다.
            circles_id : ${circles_id},
            circle : ${circles_date_year}-${circles_date_month}-${circles_date_date},
            ${circles_time}
            today : ${year}-${month}-${date},
            ${today_time}`,
        });
    }
    console.log("여기를 지나감");
    next();
};
