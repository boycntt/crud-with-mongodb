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
  // try to persist to .env; may fail on ephemeral filesystems (Render)
  fs.writeFileSync(ENV_PATH, out.join('\n') + '\n', 'utf8');
  // update runtime env
  process.env.API_KEY = key;
}

exports.generateKey = async (req, res) => {
  const raw = crypto.randomBytes(24).toString('hex');
  let writeError = null;
  try {
    writeEnvKey(raw);
  } catch (err) {
    // writing to .env may fail on hosting platforms with ephemeral or read-only filesystems (Render, etc.)
    writeError = err;
    // still set at runtime so the current process accepts the new key until restart
    process.env.API_KEY = raw;
  }

  const payload = { data: { key: raw }, status: 'success' };
  if (writeError) {
    payload.warning = 'Could not write to .env; please set API_KEY in your host environment variables (Render dashboard).';
    payload.error = writeError.message;
  }
  res.status(201).json(payload);
};
