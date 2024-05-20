const express = require("express");
const { SIGN_UP } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/sign-up", SIGN_UP);

module.exports = userRouter;
