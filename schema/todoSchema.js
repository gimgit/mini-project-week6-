const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    trackers_ID: String,
    todo_ID: String,
    content: String,
    check: Boolean,
});

module.exports = mongoose.model("todos", todoSchema);