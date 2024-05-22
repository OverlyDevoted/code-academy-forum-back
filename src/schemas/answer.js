const Joi = require("joi");

const answerSchema = Joi.object({
  answer_text: Joi.string()
    .min(100)
    .max(1000)
    .required()
    .label("Question title"),
  question_id: Joi.string().required().label("Question ID"),
  user_id: Joi.string().required().label("User ID"),
});

module.exports = answerSchema;
