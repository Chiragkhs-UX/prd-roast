// /api/transcribe.js
// Converts recorded audio → text using OpenAI Whisper API
// Accepts: multipart/form-data with an "audio" file field
// Returns: { transcript: "..." }

const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const https = require('https');

// Disable default body parsing — we handle multipart ourselves
module.exports.config = { api: { bodyParser: false } };

// ── Helper: POST multipart to OpenAI ────────────────────────────────────────
function whisperRequest(apiKey, filePath, mimeType) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath), {
      filename: 'audio.' + (mimeType.includes('mp4') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm'),
      contentType: mimeType,
    });
    form.append('model', 'whisper-1');
    form.append('language', 'en');
    form.append('response_format', 'text');

    const headers = {
      ...form.getHeaders(),
      'Authorization': `Bearer ${apiKey}`,
    };

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/audio/transcriptions',
      method: 'POST',
      headers,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data.trim());
        } else {
          try {
            const err = JSON.parse(data);
            reject(new Error(`Whisper ${res.statusCode}: ${err.error?.message || data}`));
          } catch {
            reject(new Error(`Whisper ${res.statusCode}: ${data.substring(0, 200)}`));
          }
        }
      });
    });

    req.on('error', reject);
    form.pipe(req);
  });
}

// ── Handler ──────────────────────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'OPENAI_API_KEY not set — add it in Vercel: Project Settings → Environment Variables'
    });
  }

  // Parse multipart form (audio file)
  const form = new IncomingForm({
    maxFileSize: 25 * 1024 * 1024, // 25MB max (Whisper limit)
    keepExtensions: true,
    uploadDir: '/tmp',
  });

  let filePath, mimeType;

  try {
    await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        const audioFile = files.audio?.[0] || files.audio;
        if (!audioFile) return reject(new Error('No audio file received'));
        filePath = audioFile.filepath || audioFile.path;
        mimeType = audioFile.mimetype || audioFile.type || 'audio/webm';
        resolve();
      });
    });
  } catch (parseErr) {
    console.error('[transcribe] Form parse error:', parseErr.message);
    return res.status(400).json({ error: 'Could not parse audio upload: ' + parseErr.message });
  }

  try {
    console.log(`[transcribe] Sending to Whisper: ${filePath} (${mimeType})`);
    const transcript = await whisperRequest(OPENAI_API_KEY, filePath, mimeType);
    console.log(`[transcribe] Got transcript: ${transcript.substring(0, 100)}…`);

    // Clean up temp file
    try { fs.unlinkSync(filePath); } catch (_) {}

    return res.status(200).json({ transcript });

  } catch (err) {
    console.error('[transcribe] Whisper error:', err.message);
    try { if (filePath) fs.unlinkSync(filePath); } catch (_) {}

    if (err.message.includes('401') || err.message.includes('Incorrect API key')) {
      return res.status(401).json({ error: 'Invalid OpenAI API key — check OPENAI_API_KEY in Vercel env vars' });
    }
    if (err.message.includes('429')) {
      return res.status(429).json({ error: 'OpenAI quota exceeded — check your billing at platform.openai.com' });
    }

    return res.status(500).json({ error: 'Transcription failed: ' + err.message.substring(0, 120) });
  }
};
