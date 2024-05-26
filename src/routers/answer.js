const express = require("express");
const {
  CREATE_ANSWER,
  GET_QUESTION_ANSWERS,
  DELETE_ANSWER,
  LIKE_ANSWER,
} = require("../controllers/answer");
const authUser = require("../middleware/auth");

const answerRouter = express.Router();

answerRouter.post("/answer", authUser, CREATE_ANSWER);
answerRouter.get("/answer/:id", GET_QUESTION_ANSWERS);
answerRouter.delete("/answer/:id", authUser, DELETE_ANSWER);
answerRouter.patch("/answer/:id", authUser, LIKE_ANSWER);
module.exports = answerRouter;
