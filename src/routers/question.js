const express = require("express");
const authUser = require("../middleware/auth");
const { GET_QUESTIONS, CREATE_QUESTION } = require("../controllers/question");

const questionRouter = express.Router();

questionRouter.get("/question", GET_QUESTIONS);
questionRouter.post("/question", authUser, CREATE_QUESTION);

module.exports = questionRouter;