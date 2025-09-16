const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');

// Read MONGODB_URI lazily inside functions so dotenv can be loaded by the app before this module is required.
function getMongoUri() {
  return process.env.MONGODB_URI;
}

/**
 * DBService provides helpers to inspect the connected database.
 * By default it will use the active mongoose connection. If a dbName
 * is provided we open a short-lived MongoClient to that database so
 * you can inspect arbitrary databases (for example `?db=boycntt`).
 */

// Use mongoose-connected DB when no explicit dbName is provided
exports.listCollections = async (dbName) => {
  if (dbName) return await exports.listCollectionsInDb(dbName);
  const db = mongoose.connection.db;
  if (!db) throw new Error('Not connected to database');
  const cols = await db.listCollections().toArray();
  return cols.map(c => c.name);
};

exports.findInCollection = async (collectionName, filter = {}, limit = 50, dbName) => {
  if (dbName) return await exports.findInCollectionInDb(dbName, collectionName, filter, limit);
  const db = mongoose.connection.db;
  if (!db) throw new Error('Not connected to database');
  const coll = db.collection(collectionName);
  if (!coll) throw new Error(`Collection ${collectionName} not found`);
  const cursor = coll.find(filter).limit(Number(limit));
  const docs = await cursor.toArray();
  return docs;
};

// Short-lived client for arbitrary DB name
exports.listCollectionsInDb = async (dbName) => {
  const uri = getMongoUri();
  if (!uri) throw new Error('MONGODB_URI is not set');
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db(dbName);
    const cols = await db.listCollections().toArray();
    return cols.map(c => c.name);
  } finally {
    await client.close();
  }
};

exports.findInCollectionInDb = async (dbName, collectionName, filter = {}, limit = 50) => {
  const uri = getMongoUri();
  if (!uri) throw new Error('MONGODB_URI is not set');
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db(dbName);
    const coll = db.collection(collectionName);
    if (!coll) throw new Error(`Collection ${collectionName} not found in ${dbName}`);
    const cursor = coll.find(filter).limit(Number(limit));
    const docs = await cursor.toArray();
    return docs;
  } finally {
    await client.close();
  }
};

function tryObjectId(id) {
  try {
    if (!id) return id;
    return ObjectId.isValid(id) ? new ObjectId(id) : id;
  } catch (e) {
    return id;
  }
}

// Create document
exports.createDocument = async (collectionName, doc = {}, dbName) => {
  if (dbName) return await exports.createDocumentInDb(dbName, collectionName, doc);
  const db = mongoose.connection.db;
  if (!db) throw new Error('Not connected to database');
  const coll = db.collection(collectionName);
  const result = await coll.insertOne(doc);
  return await coll.findOne({ _id: result.insertedId });
};

exports.createDocumentInDb = async (dbName, collectionName, doc = {}) => {
  const uri = getMongoUri();
  if (!uri) throw new Error('MONGODB_URI is not set');
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db(dbName);
    const coll = db.collection(collectionName);
    const result = await coll.insertOne(doc);
    return await coll.findOne({ _id: result.insertedId });
  } finally {
    await client.close();
  }
};

// Get single document by id
exports.getDocumentById = async (collectionName, id, dbName) => {
  if (dbName) return await exports.getDocumentByIdInDb(dbName, collectionName, id);
  const db = mongoose.connection.db;
  if (!db) throw new Error('Not connected to database');
  const coll = db.collection(collectionName);
  const qid = tryObjectId(id);
  return await coll.findOne({ _id: qid });
};

exports.getDocumentByIdInDb = async (dbName, collectionName, id) => {
  const uri = getMongoUri();
  if (!uri) throw new Error('MONGODB_URI is not set');
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db(dbName);
    const coll = db.collection(collectionName);
    const qid = tryObjectId(id);
    return await coll.findOne({ _id: qid });
  } finally {
    await client.close();
  }
};

// Update document by id (partial update using $set)
exports.updateDocument = async (collectionName, id, update = {}, dbName) => {
  if (dbName) return await exports.updateDocumentInDb(dbName, collectionName, id, update);
  const db = mongoose.connection.db;
  if (!db) throw new Error('Not connected to database');
  const coll = db.collection(collectionName);
  const qid = tryObjectId(id);
  await coll.updateOne({ _id: qid }, { $set: update });
  return await coll.findOne({ _id: qid });
};

exports.updateDocumentInDb = async (dbName, collectionName, id, update = {}) => {
  const uri = getMongoUri();
  if (!uri) throw new Error('MONGODB_URI is not set');
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db(dbName);
    const coll = db.collection(collectionName);
    const qid = tryObjectId(id);
    await coll.updateOne({ _id: qid }, { $set: update });
    return await coll.findOne({ _id: qid });
  } finally {
    await client.close();
  }
};

// Delete document by id
exports.deleteDocument = async (collectionName, id, dbName) => {
  if (dbName) return await exports.deleteDocumentInDb(dbName, collectionName, id);
  const db = mongoose.connection.db;
  if (!db) throw new Error('Not connected to database');
  const coll = db.collection(collectionName);
  const qid = tryObjectId(id);
  const deleted = await coll.findOneAndDelete({ _id: qid });
  return deleted.value;
};

exports.deleteDocumentInDb = async (dbName, collectionName, id) => {
  const uri = getMongoUri();
  if (!uri) throw new Error('MONGODB_URI is not set');
  const client = new MongoClient(uri);
  await client.connect();
  try {
    const db = client.db(dbName);
    const coll = db.collection(collectionName);
    const qid = tryObjectId(id);
    const deleted = await coll.findOneAndDelete({ _id: qid });
    return deleted.value;
  } finally {
    await client.close();
  }
};
