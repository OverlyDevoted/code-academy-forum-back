const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    category_name: { type: String, required: true },
  },
  { timestamps: true }
);

const categoryModel = mongoose.Model("Question", categorySchema, "questions");

module.exports = categoryModel;
