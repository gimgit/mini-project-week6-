const mongoose = require("mongoose");

const { Schema } = mongoose;
const TodosSchema = new Schema({
  todos_id: {
    type: String,
    required: true,
  },
  todo_content: {
    type: String,
    required: true,
  },
  circles_id: {
    type: String,
    required: true,
  },
  todo_check: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Todos", TodosSchema);
