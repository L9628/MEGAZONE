const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyId: { type: String, unique: true },
  companyName: { type: String, unique: true },
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model("company", CompanySchema);
