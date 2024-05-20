require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./src/routers/user");

const app = new express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen("8080", () => {
  console.log("Server listening on http://localhost:8080");
});
