const mongoose = require("mongoose");

const circlesSchema = new mongoose.Schema({
    projects_id: {
        type: Number,
        required: true,
    },
    circles_id: {
        type: String,
        required: true,
        unique: true,
    },
    feedback: {
        type: String,
    },
    circles_date: {
        type: String,
        required: true,
    },
    check_count: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("circles", circlesSchema);
