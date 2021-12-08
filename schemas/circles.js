const mongoose = require("mongoose");

const circlesSchema = new mongoose.Schema({
  projects_id: {
    type: Number,
    unique: true,
    required: true,
  },
  circles_id: {
    type: String,
    unique: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
  },
});

module.exports = mongoose.model("circles", circlesSchema);
