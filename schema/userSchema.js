const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID : String,
    pw : String,
});

module.exports = mongoose.model("users", userSchema);