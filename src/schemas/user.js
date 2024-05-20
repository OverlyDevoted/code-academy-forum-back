const Joi = require("joi");

const userSchema = Joi.object({
  first_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .label("First name"),
  second_name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .label("Second name"),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
    )
    .label("Password"),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .label("Email"),
});

module.exports = userSchema;
