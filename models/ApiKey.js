const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiKeySchema = new Schema({
  keyHash: { type: String, required: true, unique: true },
  name: { type: String },
  revoked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ApiKey', apiKeySchema);
