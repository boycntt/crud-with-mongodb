module.exports = function(req, res, next) {
  const expected = process.env.API_KEY;
  if (!expected) {
    console.warn('API_KEY not set in .env; access will be denied');
    return res.status(500).json({ error: 'Server not configured with API_KEY' });
  }

  const apiKeyHeader = req.get('x-api-key') || req.query.api_key;
  if (apiKeyHeader && apiKeyHeader === expected) return next();

  return res.status(401).json({ error: 'Invalid or missing API key' });
};
