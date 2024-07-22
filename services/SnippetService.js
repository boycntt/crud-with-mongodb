const SnippetModel = require("../models/Snippet");

exports.getAllSnippets = async () => {
  return await SnippetModel.find();
};

exports.createSnippet = async (Snippet) => {
  return await SnippetModel.create(Snippet);
};
exports.getSnippetById = async (id) => {
  return await SnippetModel.findById(id);
};

exports.updateSnippet = async (id, Snippet) => {
  return await SnippetModel.findByIdAndUpdate(id, Snippet);
};

exports.deleteSnippet = async (id) => {
  return await SnippetModel.findByIdAndDelete(id);
};
