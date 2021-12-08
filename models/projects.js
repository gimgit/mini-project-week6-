const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projects_id:{
    type: Number,
    unique: true
  },
  project_title:{
     type: String,
     required: true,
     index : true
  },
  userId:{
    type: String
  },
  date:{
      type: String,
      unique: true
  }
});

module.exports = mongoose.model("Project", projectSchema);