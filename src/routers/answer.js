const express = require("express");
const {
  CREATE_ANSWER,
  GET_QUESTION_ANSWERS,
} = require("../controllers/answer");
const authUser = require("../middleware/auth");

const answerRouter = express.Router();

answerRouter.post("/answer", authUser, CREATE_ANSWER);
answerRouter.get("/answer/:id", GET_QUESTION_ANSWERS);

module.exports = answerRouter;
