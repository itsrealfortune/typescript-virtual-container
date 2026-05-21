import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');
const examplesDir = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.map': 'application/json',
};

const server = createServer(async (req, res) => {
  const reqPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = join(examplesDir, reqPath);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} -> ${filePath}`);
  
  try {
    const content = await readFile(filePath);
    const ext = extname(filePath);
    const mimeType = mimeTypes[ext] || 'application/octet-stream';
    
    // Headers to bypass Cloudflare challenges and allow ES6 modules
    const headers = {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    };
    
    // Cloudflare-specific header to bypass challenge
    if (reqPath === '/index.html' || reqPath === '/app.js' || reqPath === '/web.min.js') {
      headers['CF-Mitigate-Challenge'] = 'bypass';
    }
    
    res.writeHead(200, headers);
    res.end(content);
    console.log(`  ✓ 200 ${mimeType}`);
  } catch (err) {
    console.log(`  ✗ 404 ${err.code}`);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = 8787;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving files from: ${examplesDir}`);
});
