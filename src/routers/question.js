const express = require("express");
const authUser = require("../middleware/auth");
const {
  GET_QUESTIONS,
  CREATE_QUESTION,
  GET_QUESTION,
  DELETE_QUESTIONS,
} = require("../controllers/question");

const questionRouter = express.Router();

questionRouter.get("/question", GET_QUESTIONS);
questionRouter.get("/question/:id", GET_QUESTION);
questionRouter.post("/question", authUser, CREATE_QUESTION);
questionRouter.delete("/question/:id", authUser, DELETE_QUESTIONS);

module.exports = questionRouter;
