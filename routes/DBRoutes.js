const express = require('express');
const { listCollections, getDocuments, createDocument, getDocumentById, updateDocument, deleteDocument } = require('../controllers/DBController');
const router = express.Router();

// GET /api/db/collections
router.get('/collections', listCollections);

// CRUD for dynamic collections
// GET /api/db/:collection?limit=10&field=value
router.get('/:collection', getDocuments);

// POST /api/db/:collection - create document (optional ?db=dbname)
router.post('/:collection', createDocument);

// GET single document
router.get('/:collection/:id', getDocumentById);

// PUT update document
router.put('/:collection/:id', updateDocument);

// DELETE document
router.delete('/:collection/:id', deleteDocument);

module.exports = router;
