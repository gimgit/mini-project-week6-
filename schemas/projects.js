const mongoose = require("mongoose");

const { Schema } = mongoose;
const ProjectsSchema = new Schema({
  project_id: {
    type: String,
    unique: true,
    required: true,
  },
  project_title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Projects", ProjectsSchema);
