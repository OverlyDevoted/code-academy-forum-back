const Joi = require("joi");

const userSchema = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  second_name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
  ),
  email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
});

module.exports = userSchema;
