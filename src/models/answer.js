const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    answer_text: { type: String, required: true },
    liked_by: { type: Array(String), required: true },
    question_id: { type: String, required: true },
  },
  { timestamps: true }
);

const answerModel = mongoose.Model("Question", answerSchema, "questions");

module.exports = answerModel;
