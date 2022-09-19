const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  price: { type: Number },
});
