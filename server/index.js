const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const historiesRoute = require("./routes/histories");
const servicesRoute = require("./routes/services");
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
  origin: true,
  credentials: true,
  // optionSuccessStatus: 200,
  method: ["GET", "POST", "DELETE", "PUT"],
};

app.use(express());
app.use(express.json());
app.use("/histories", historiesRoute);
app.use("/services", servicesRoute);
app.use(cors(corsOptions));

app.listen(5000, () => {
  console.log(`Server is running. http://localhost:5000`);
});
