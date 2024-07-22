const SnippetService = require("../services/SnippetService");

exports.getAllSnippets = async (req, res) => {
  try {
    const Snippets = await SnippetService.getAllSnippets();
    res.json({ data: Snippets, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSnippet = async (req, res) => {
  try {
    const Snippet = await SnippetService.createSnippet(req.body);
    res.json({ data: Snippet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSnippetById = async (req, res) => {
  try {
    const Snippet = await SnippetService.getSnippetById(req.params.id);
    res.json({ data: Snippet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSnippet = async (req, res) => {
  try {
    const Snippet = await SnippetService.updateSnippet(req.params.id, req.body);
    res.json({ data: Snippet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSnippet = async (req, res) => {
  try {
    const Snippet = await SnippetService.deleteSnippet(req.params.id);
    res.json({ data: Snippet, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
