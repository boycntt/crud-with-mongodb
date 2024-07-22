const TradeContentModel = require("../models/TradeContent");

exports.createTradeContent = async (TradeContent) => {
  return await TradeContentModel.create(TradeContent);
};

exports.getAllTradeContents = async (fobj) => {
  return await TradeContentModel.find(fobj);
};

exports.getTradeContentById = async (id) => {
  return await TradeContentModel.findById(id);
};

exports.updateTradeContent = async (id, TradeContent) => {
  return await TradeContentModel.findByIdAndUpdate(id, TradeContent);
};

exports.deleteTradeContent = async (id) => {
  return await TradeContentModel.findByIdAndDelete(id);
};
