const express = require('express');
const { generateKey } = require('../controllers/GenerateKeyController');
const router = express.Router();

// POST /api/generate-key - generates a single API_KEY and writes it to .env
router.post('/', generateKey);

module.exports = router;
