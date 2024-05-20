const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    question_text: { type: String, required: true },
    user_id: { type: String, required: true },
    category_id: { type: String, required: true },
  },
  { timestamps: true }
);

const questionModel = mongoose.Model("Question", questionSchema, "questions");

module.exports = questionModel;
