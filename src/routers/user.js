const express = require("express");
const { SIGN_UP, LOG_IN } = require("../controllers/user");

const userRouter = express.Router();

userRouter.post("/signup", SIGN_UP);
userRouter.post("/login", LOG_IN);

module.exports = userRouter;
