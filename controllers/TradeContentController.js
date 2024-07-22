
const tradeContentService = require("../services/TradeContentService");


exports.getAllTradeContents = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const tradeContents = await tradeContentService.getAllTradeContents(req.query);
    res.json({ data: tradeContents, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTradeContentById = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const tradeContent = await tradeContentService.getTradeContentById(req.params.id);
    res.json({ data: tradeContent, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTradeContent = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const tradeContent = await tradeContentService.createTradeContent(req.body);
    res.json({ data: tradeContent, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTradeContent = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const tradeContent = await tradeContentService.updateTradeContent(req.params.id, req.body);
    res.json({ data: tradeContent, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTradeContent = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const tradeContent = await tradeContentService.deleteTradeContent(req.params.id);
    res.json({ data: tradeContent, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
