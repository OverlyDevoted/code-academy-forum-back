const userSchema = require("../schemas/user");

module.exports.SIGN_UP = (req, res) => {
  const validation = userSchema.validate(req.body);
  return res.json(validation);
};

module.exports.LOG_IN = (req, res) => {};
