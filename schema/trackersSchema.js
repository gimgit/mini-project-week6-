const mongoose = require("mongoose");

const trackerSchema = new mongoose.schema({
    userID: String,
    project_title: String,
    trackers_ID: String,
});

module.exports = mongoose.model("trackers", trackerSchema);

