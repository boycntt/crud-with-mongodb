const express = require('express');
const { createApiKey, revokeApiKey } = require('../controllers/ApiKeyController');
const router = express.Router();

// POST /api/apikeys - create API key (protected in production)
router.post('/', createApiKey);

// POST /api/apikeys/revoke - revoke API key by key
router.post('/revoke', revokeApiKey);

module.exports = router;
