const TradeModel = require("../models/Trade");

exports.getAllTrades = async (fobj) => {
  return await TradeModel.find(fobj);
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
