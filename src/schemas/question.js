const Joi = require("joi");

const questionSchema = Joi.object({
  question_title: Joi.string()
    .min(10)
    .max(100)
    .required()
    .label("Question title"),
  question_text: Joi.string()
    .min(100)
    .max(1000)
    .required()
    .label("Question text"),
  user_id: Joi.string().required().label("User ID"),
  category_id: Joi.string().required().label("Category ID"),
});

module.exports = questionSchema;
