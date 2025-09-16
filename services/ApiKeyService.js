const ApiKeyModel = require('../models/ApiKey');
const crypto = require('crypto');

function hashKey(key){
  return crypto.createHash('sha256').update(key).digest('hex');
}

exports.createKey = async (name) => {
  const key = crypto.randomBytes(24).toString('hex');
  const keyHash = hashKey(key);
  await ApiKeyModel.create({ keyHash, name });
  return { key, name };
};

exports.findByKey = async (key) => {
  const keyHash = hashKey(key);
  return await ApiKeyModel.findOne({ keyHash, revoked: false });
};

exports.revokeKey = async (key) => {
  const keyHash = hashKey(key);
  return await ApiKeyModel.findOneAndUpdate({ keyHash }, { revoked: true }, { new: true });
};
