const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ENV_PATH = path.resolve(__dirname, '..', '.env');

function writeEnvKey(key){
  let content = '';
  try{
    content = fs.readFileSync(ENV_PATH, 'utf8');
  } catch (e) {
    content = '';
  }

  const lines = content.split(/\r?\n/).filter(Boolean);
  let found = false;
  const out = lines.map(line => {
    if (line.trim().startsWith('API_KEY=')){
      found = true;
      return `API_KEY=${key}`;
    }
    return line;
  });
  if (!found) out.push(`API_KEY=${key}`);
  fs.writeFileSync(ENV_PATH, out.join('\n') + '\n', 'utf8');
  // update runtime env
  process.env.API_KEY = key;
}

exports.generateKey = async (req, res) => {
  try{
    const raw = crypto.randomBytes(24).toString('hex');
    writeEnvKey(raw);
    res.status(201).json({ data: { key: raw }, status: 'success' });
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};
