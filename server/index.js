const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.ATLAS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB https://cloud.mongodb.com/"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log(`Server is running. http://localhost:5000`);
});
