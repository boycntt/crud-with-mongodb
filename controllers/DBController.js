const dbService = require('../services/DBService');

exports.listCollections = async (req, res) => {
  try {
  const dbName = req.query.db;
  const cols = await dbService.listCollections(dbName);
    res.json({ data: cols, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const { collection } = req.params;
  const { limit, db, ...query } = req.query;
  // parse query values as strings; advanced parsing left as future work
  const docs = await dbService.findInCollection(collection, query || {}, limit || 50, db);
    res.json({ data: docs, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDocument = async (req, res) => {
  try {
    const { collection } = req.params;
    const dbName = req.query.db;
    const doc = req.body;
    const created = await dbService.createDocument(collection, doc, dbName);
    res.status(201).json({ data: created, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDocumentById = async (req, res) => {
  try {
    const { collection, id } = req.params;
    const dbName = req.query.db;
    const doc = await dbService.getDocumentById(collection, id, dbName);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ data: doc, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const { collection, id } = req.params;
    const dbName = req.query.db;
    const updated = await dbService.updateDocument(collection, id, req.body, dbName);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ data: updated, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { collection, id } = req.params;
    const dbName = req.query.db;
    const deleted = await dbService.deleteDocument(collection, id, dbName);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ data: deleted, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
