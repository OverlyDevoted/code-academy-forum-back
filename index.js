require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./src/routers/user");
const db_connect = require("./src/middleware/db");
const categoryRouter = require("./src/routers/category");

db_connect();

const app = new express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(userRouter);
app.use(categoryRouter);

app.listen("8080", () => {
  console.log("Server listening on http://localhost:8080");
});
