const apiKeyService = require('../services/ApiKeyService');

exports.createApiKey = async (req, res) => {
  try {
    const { name } = req.body;
    const created = await apiKeyService.createKey(name);
    res.status(201).json({ data: created, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.revokeApiKey = async (req, res) => {
  try {
    const { key } = req.body;
    const revoked = await apiKeyService.revokeKey(key);
    if (!revoked) return res.status(404).json({ error: 'Not found' });
    res.json({ data: revoked, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
