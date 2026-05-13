// ── In-memory cache backed by IndexedDB (async writes, sync reads from cache) ──

const DB_NAME = 'vfs-fs-shim';
const STORE   = 'files';
let db = null;

function openDB() {
  if (db) return Promise.resolve(db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore(STORE);
    req.onsuccess  = e => { db = e.target.result; resolve(db); };
    req.onerror    = e => reject(e.target.error);
  });
}

// Sync cache (path → Uint8Array | null)
const memCache = new Map();

// Preload all keys into memCache at startup
openDB().then(db => {
  const tx = db.transaction(STORE, 'readonly');
  const req = tx.objectStore(STORE).openCursor();
  req.onsuccess = e => {
    const cursor = e.target.result;
    if (!cursor) return;
    memCache.set(cursor.key, cursor.value);
    cursor.continue();
  };
});

function idbSet(path, value) {
  openDB().then(db => {
    const tx = db.transaction(STORE, 'readwrite');
    if (value === null) tx.objectStore(STORE).delete(path);
    else tx.objectStore(STORE).put(value, path);
  });
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toBytes(data, encoding = 'utf8') {
  if (data instanceof Uint8Array) return data;
  if (typeof data === 'string') {
    if (encoding === 'hex') {
      const arr = new Uint8Array(data.length / 2);
      for (let i = 0; i < arr.length; i++)
        arr[i] = parseInt(data.slice(i*2, i*2+2), 16);
      return arr;
    }
    return new TextEncoder().encode(data);
  }
  return new Uint8Array(data);
}

function fromBytes(bytes, encoding = 'utf8') {
  if (!encoding || encoding === 'utf8') return new TextDecoder().decode(bytes);
  if (encoding === 'hex') return Array.from(bytes).map(b => b.toString(16).padStart(2,'0')).join('');
  if (encoding === 'base64') return btoa(String.fromCharCode(...bytes));
  return new TextDecoder().decode(bytes);
}

function parentPath(p) {
  const parts = p.split('/').filter(Boolean);
  parts.pop();
  return '/' + parts.join('/');
}

// ── Sync API (reads from memCache) ───────────────────────────────────────────

export function existsSync(path) {
  return memCache.has(path);
}

export function readFileSync(path, optionsOrEncoding) {
  if (!memCache.has(path)) throw Object.assign(new Error(`ENOENT: no such file: ${path}`), { code: 'ENOENT' });
  const bytes = memCache.get(path);
  if (bytes === '__DIR__') throw Object.assign(new Error(`EISDIR: ${path}`), { code: 'EISDIR' });
  const enc = typeof optionsOrEncoding === 'string' ? optionsOrEncoding : optionsOrEncoding?.encoding;
  return enc ? fromBytes(bytes, enc) : bytes;
}

export function writeFileSync(path, data, optionsOrEncoding) {
  const enc = typeof optionsOrEncoding === 'string' ? optionsOrEncoding : optionsOrEncoding?.encoding;
  const bytes = toBytes(data, enc);
  memCache.set(path, bytes);
  idbSet(path, bytes);
}

export function appendFileSync(path, data, optionsOrEncoding) {
  const enc = typeof optionsOrEncoding === 'string' ? optionsOrEncoding : optionsOrEncoding?.encoding;
  const newBytes = toBytes(data, enc);
  const existing = memCache.has(path) ? memCache.get(path) : new Uint8Array(0);
  const merged = new Uint8Array(existing.length + newBytes.length);
  merged.set(existing);
  merged.set(newBytes, existing.length);
  memCache.set(path, merged);
  idbSet(path, merged);
}

export function unlinkSync(path) {
  memCache.delete(path);
  idbSet(path, null);
}

export function rmSync(path, options = {}) {
  if (options.recursive) {
    for (const key of [...memCache.keys()]) {
      if (key === path || key.startsWith(path + '/')) {
        memCache.delete(key);
        idbSet(key, null);
      }
    }
  } else {
    unlinkSync(path);
  }
}

export function mkdirSync(path, options = {}) {
  if (options.recursive) {
    // ensure all parents exist
    const parts = path.split('/').filter(Boolean);
    let cur = '';
    for (const p of parts) {
      cur += '/' + p;
      if (!memCache.has(cur)) { memCache.set(cur, '__DIR__'); idbSet(cur, '__DIR__'); }
    }
  } else {
    memCache.set(path, '__DIR__');
    idbSet(path, '__DIR__');
  }
}

export function readdirSync(path) {
  const prefix = path.endsWith('/') ? path : path + '/';
  return [...memCache.keys()]
    .filter(k => k.startsWith(prefix) && k.slice(prefix.length).split('/').length === 1)
    .map(k => k.slice(prefix.length));
}

export function statSync(path) {
  if (!memCache.has(path)) throw Object.assign(new Error(`ENOENT: ${path}`), { code: 'ENOENT' });
  const val = memCache.get(path);
  const isDir = val === '__DIR__';
  return {
    isDirectory: () => isDir,
    isFile: () => !isDir,
    size: isDir ? 0 : val.length,
  };
}

// ── fd stubs (journal uses these) ────────────────────────────────────────────

const fdMap = new Map();
let fdCounter = 10;

export const constants = { O_WRONLY: 1, O_CREAT: 64, O_APPEND: 1024 };

export function openSync(path, flags) {
  const fd = fdCounter++;
  const append = (flags & constants.O_APPEND) !== 0;
  const existing = memCache.has(path) ? memCache.get(path) : new Uint8Array(0);
  fdMap.set(fd, { path, data: append ? existing : new Uint8Array(0) });
  return fd;
}

export function writeSync(fd, buf) {
  const entry = fdMap.get(fd);
  if (!entry) return;
  const merged = new Uint8Array(entry.data.length + buf.length);
  merged.set(entry.data);
  merged.set(buf, entry.data.length);
  entry.data = merged;
}

export function closeSync(fd) {
  const entry = fdMap.get(fd);
  if (!entry) return;
  memCache.set(entry.path, entry.data);
  idbSet(entry.path, entry.data);
  fdMap.delete(fd);
}

export default {
  existsSync, readFileSync, writeFileSync, appendFileSync,
  unlinkSync, rmSync, mkdirSync, readdirSync, statSync,
  openSync, writeSync, closeSync, constants,
};