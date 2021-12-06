const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
    userID: String,
    project_title: String,
    trackers_ID: String,
    todo_ID: String,
    content: String,
    check: String,
    feedback: String,
});

module.exports = mongoose.model("details", detailSchema);