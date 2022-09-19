const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  companyId: { type: String, unique: true },
  currentCoin: { type: Number },
  currentCash: { type: Number },
  currentBonus: { type: Number },
  lastUpdated: { type: String },
  cashChargedDate: { type: String },
  cashChargedAmount: { type: Number },
  bonusChargedDate: { type: String },
  bonusChargedAmount: { type: String },
  coinDeducted: { type: Number },
  serviceName: { type: String },
  coinDeductedDate: { type: String },
  deductionResult: { type: String },
});
