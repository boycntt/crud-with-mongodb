const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
  body: String
});

module.exports = mongoose.model("Snippet", SnippetSchema);
