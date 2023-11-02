const tradeService = require("../services/TradeService");

exports.getAllTrades = async (req, res) => {
  try {
    const trades = await tradeService.getAllTrades();
    res.json({ data: trades, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTrade = async (req, res) => {
  try {
    const trade = await tradeService.createTrade(req.body);
    res.json({ data: trade, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTradeById = async (req, res) => {
  try {
    const trade = await tradeService.getTradeById(req.params.id);
    res.json({ data: trade, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTrade = async (req, res) => {
  try {
    const trade = await tradeService.updateTrade(req.params.id, req.body);
    res.json({ data: trade, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTrade = async (req, res) => {
  try {
    const trade = await tradeService.deleteTrade(req.params.id);
    res.json({ data: trade, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
