const express = require("express");
const {
  createTrade,updateTrade,deleteTrade,getAllTrades,getTradeById
} = require("../controllers/TradeController");

const router = express.Router();

router.route("/").get(getAllTrades).post(createTrade);
router.route("/:id").get(getTradeById).put(updateTrade).delete(deleteTrade);

module.exports = router;
