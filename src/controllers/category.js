const { v4: uuid } = require("uuid");
const categoryModel = require("../models/category");
const categorySchema = require("../schemas/category");
const getHue = require("../helpers/getHue");

module.exports.GET_CATEGORIES = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories.length)
      return res.status(404).json({ message: "No categories found" });
    return res.json({ categories });
  } catch (e) {
    return res.status(500).json({ message: "Could not retrieve categories" });
  }
};

module.exports.CREATE_CATEGORY = async (req, res) => {
  try {
    const validation = categorySchema.validate({
      category_name: req.body.category_name,
    });
    if (validation.error) {
      console.log(validation.error);
      return res.status(400).json({ message: "Bad body for category" });
    }
    const { value: categoryValue } = validation;
    const category = new categoryModel({
      category_name: categoryValue.category_name,
      id: uuid(),
      hue: getHue(),
    });
    await category.save();

    return res.json({ message: "Successfully added category" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Could not add category" });
  }
};
