const express = require("express");
const {
  getAllSnippets,
  createSnippet,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} = require("../controllers/SnippetController");

const router = express.Router();

router.route("/").get(getAllSnippets).post(createSnippet);
router.route("/:id").get(getSnippetById).put(updateSnippet).delete(deleteSnippet);

module.exports = router;
