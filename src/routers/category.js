const express = require("express");
const { GET_CATEGORIES, CREATE_CATEGORY } = require("../controllers/category");
const authUser = require("../middleware/auth");

const categoryRouter = express.Router();

categoryRouter.get("/category", GET_CATEGORIES);
categoryRouter.post("/category", authUser, CREATE_CATEGORY);

module.exports = categoryRouter;
