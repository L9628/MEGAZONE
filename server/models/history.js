const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    companyId: { type: String, unique: true },
    currentCoin: { type: Number },
    currentCash: { type: Number },
    currentBonus: { type: Number },
    lastUpdated: { type: String },
    cashChargedDate: { type: String },
    cashChargedAmount: { type: Number },
    bonusChargedDate: { type: String },
    bonusChargedAmount: { type: Number },
    coinDeducted: { type: Number },
    serviceName: { type: String },
    coinDeductedDate: { type: String },
    deductionResult: { type: String },
  },
  { timestamp: true }
);

module.exports = mongoose.model("history", HistorySchema);
