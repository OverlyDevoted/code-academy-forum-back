require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = new express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("OK");
});

app.listen("8080", () => {
  console.log("Server listening on http://localhost:8080");
});
