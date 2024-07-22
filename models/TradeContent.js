const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tradeContentSchema = new Schema({
  user_id: String,
  trade_id: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TradeContent", tradeContentSchema);
