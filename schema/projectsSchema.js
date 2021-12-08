const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    userID: String,
    project_title: String,
    date: String,
});

module.exports = mongoose.model("projects", projectSchema);
