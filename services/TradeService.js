const TradeModel = require("../models/Trade");

exports.getAllTrades = async () => {
  return await TradeModel.find();
};

exports.createTrade = async (blog) => {
  return await TradeModel.create(blog);
};
exports.getTradeById = async (id) => {
  return await TradeModel.findById(id);
};

exports.updateTrade = async (id, blog) => {
  return await TradeModel.findByIdAndUpdate(id, blog);
};

exports.deleteTrade = async (id) => {
  return await TradeModel.findByIdAndDelete(id);
};
