const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Mongoose connected to MongoDB Atlas successfully");
  } catch (err) {
    console.error("Mongoose Connection Failed:", err);
  }
}

module.exports = connectDB;