const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5000;
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log("Server is running on 5000");
});
