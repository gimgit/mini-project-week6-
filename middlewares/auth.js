const JWT = require("jsonwebtoken");
// const users = require("./shcemas/userSchema");

module.exports = async (req, res, next) => {
    // console.log("여기를 지나서");
    // next();
    try {
        const token = await req.headers["authorization"];
        const [type, encodedToken] = token.split(" ");
        const userID = JWT.verify(encodedToken, "99td");
        res.locals = userID;
        next();
    } catch {
        res.status(403).send();
        return;
    }
};
