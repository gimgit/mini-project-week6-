const JWT = require("jsonwebtoken");
// const users = require("./shcemas/userSchema");

module.exports = async (req, res, next) => {
    // console.log("여기를 지나서");
    // next();
    try {
        const token = await req.headers["authorization"];
        console.log(token);
        const [type, encodedToken] = token.split(" ");
        const userID = JWT.verify(encodedToken, "secret-key");
        res.locals = userID;
        next();
    } catch {
        res.status(403).send("유효하지 않은 사용자입니다");
        return;
    }
}
