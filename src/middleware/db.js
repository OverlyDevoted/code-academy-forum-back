const mongoose = require("mongoose");

const db_connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected to DB");
  } catch (e) {
    console.log("Could not connect DB");
  }
};

module.exports = db_connect;
