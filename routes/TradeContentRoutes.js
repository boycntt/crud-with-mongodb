const express = require("express");
const {
  createTradeContent,updateTradeContent,deleteTradeContent,getAllTradeContents,getTradeContentById
} = require("../controllers/TradeContentController");

const router = express.Router();

router.route("/").get(getAllTradeContents).post(createTradeContent);
router.route("/:id").get(getTradeContentById).put(updateTradeContent).delete(deleteTradeContent);

module.exports = router;
