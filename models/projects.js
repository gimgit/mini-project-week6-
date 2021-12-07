const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projects_Id:{
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
  postId:{
    type: Number,
    unique: true
  },
  date:{
      type: String,
      unique: true
  }
});
// projectSchema.index

module.exports = mongoose.model("Project", projectSchema);