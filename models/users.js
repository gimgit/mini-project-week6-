const mongoose = require("mongoose");

// const { Schema } = mongoose;
const UserSchema = new mongoose.Schema({
  userId:{
    type: String,
    unique: true,
    required: true
  },
  pw:{
     type: String,
     required: true
  },
  nickname:{
    type: String,
    unique: true,
    required: true
 }
});
module.exports = mongoose.model("User", UserSchema);