const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    answer_text: { type: String, required: true },
    liked_by: { type: Array(String), required: true, default: [] },
    disliked_by: { type: Array(String), required: true, default: [] },
    question_id: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

const answerModel = mongoose.model("Question", answerSchema, "questions");

module.exports = answerModel;
