const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/user");
const userModel = require("../models/user");
const getHue = require("../helpers/getHue");

module.exports.SIGN_UP = async (req, res) => {
  const validation = userSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: "Did not pass validation",
      errors: validation.error.details.map((detail) => ({
        [detail.context.key]: detail.message,
      })),
    });
  }
  const userData = validation.value;

  console.log(
    "Checking registering user",
    userData.first_name,
    userData.second_name,
    userData.email
  );

  const checkUser = await userModel.findOne({
    $or: [
      {
        $and: [
          { first_name: userData.first_name },
          { second_name: userData.second_name },
        ],
      },
      { email: userData.email },
    ],
  });

  if (checkUser)
    return res.status(400).json({ message: "User already exits. Try again" });

  console.log("User registering");

  const pswSalt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(userData.password, pswSalt);
  const user = new userModel({
    ...userData,
    id: uuid(),
    password: hash,
    hue: getHue(),
  });
  await user.save();
  return res.json({
    message: "Successful register",
  });
};

module.exports.LOG_IN = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Failed login" });

  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).json({ message: "Failed login" });

  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch)
    return res.status(400).json({ message: "Failed login" });

  const jwtToken = jwt.sign(
    { name: user.username, id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  console.log(`Successfull login by ${email}`);
  return res.json({ message: "Success", jwtToken });
};

module.exports.GET_USER_DATA = async (req, res) => {
  try {
    const { user_id: id } = req.body;
    const user = await userModel.findOne({ id }, { password: 0 });
    if (!user) return res.status(400).json({ message: "No user found" });
    return res.json({ user });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Something went bad while retrieving user data" });
  }
};

module.exports.ATTACH_ID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).message({ message: "Did not provide an id" });
    req.body.user_id = id;
    return next();
  } catch (e) {
    return res.status(500).json("Something went bad");
  }
};
