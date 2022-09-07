const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server is running on 5000");
});
