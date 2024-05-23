const express = require("express");
const { SIGN_UP, LOG_IN } = require("../controllers/user");
const { GET_USER_QUESTIONS } = require("../controllers/question");
const authUser = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/signup", SIGN_UP);
userRouter.post("/login", LOG_IN);
userRouter.get("/user/:id/questions", GET_USER_QUESTIONS);

module.exports = userRouter;
