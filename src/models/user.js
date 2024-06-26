const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    hue: { type: Number, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema, "users");

module.exports = userModel;
