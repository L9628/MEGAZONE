const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: String },
});

module.exports = mongoose.model("service", ServiceSchema);
