const Joi = require("joi");

const categorySchema = Joi.object({
  category_name: Joi.string().min(1).max(30).required().label("Category name"),
});

module.exports = categorySchema;
