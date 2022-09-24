const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const historiesRoute = require("./routes/histories");
const servicesRoute = require("./routes/services");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(`${process.env.ATLAS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB https://cloud.mongodb.com/"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: ["*", "http://localhost:3000"],
  credentials: true,
  method: ["GET", "POST", "DELETE", "PUT"],
};

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(express());
app.use(express.json());
app.use("/histories", historiesRoute);
app.use("/services", servicesRoute);
app.use("/auth", authRoute);
app.use(cors(corsOptions));

app.listen(5000, () => {
  console.log(`Server is running. http://localhost:5000`);
});
