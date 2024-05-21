const express = require("express");
const { GET_CATEGORIES } = require("../controllers/category");
const authUser = require("../middleware/auth");

const categoryRouter = express.Router();

categoryRouter.get("/category", authUser, GET_CATEGORIES);

module.exports = categoryRouter;
