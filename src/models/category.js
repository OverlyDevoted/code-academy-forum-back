const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    category_name: { type: String, required: true },
    hue: { type: Number, required: true },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema, "categories");

module.exports = categoryModel;
