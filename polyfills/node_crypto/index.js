// ─── SHA-256 (pure JS) ───────────────────────────────────────────────────────
const K = new Uint32Array([
  0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
  0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
  0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
  0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
  0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
  0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
  0x19a4c116,0x1e376c085,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
  0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2,
]);

function sha256(data) {
  const msg = data instanceof Uint8Array ? data : new TextEncoder().encode(data);
  const bits = msg.length * 8;
  const padLen = Math.ceil((msg.length + 9) / 64) * 64;
  const padded = new Uint8Array(padLen);
  padded.set(msg);
  padded[msg.length] = 0x80;
  const dv0 = new DataView(padded.buffer);
  dv0.setUint32(padLen - 4, bits >>> 0, false);

  let h0=0x6a09e667, h1=0xbb67ae85, h2=0x3c6ef372, h3=0xa54ff53a,
      h4=0x510e527f, h5=0x9b05688c, h6=0x1f83d9ab, h7=0x5be0cd19;

  const w = new Uint32Array(64);
  const dv = new DataView(padded.buffer);
  for (let i = 0; i < padLen; i += 64) {
    for (let j = 0; j < 16; j++) w[j] = dv.getUint32(i + j * 4, false);
    for (let j = 16; j < 64; j++) {
      const s0 = (w[j-15]>>>7|w[j-15]<<25)^(w[j-15]>>>18|w[j-15]<<14)^(w[j-15]>>>3);
      const s1 = (w[j-2]>>>17|w[j-2]<<15)^(w[j-2]>>>19|w[j-2]<<13)^(w[j-2]>>>10);
      w[j] = (w[j-16] + s0 + w[j-7] + s1) | 0;
    }
    let a=h0,b=h1,c=h2,d=h3,e=h4,f=h5,g=h6,hh=h7;
    for (let j = 0; j < 64; j++) {
      const S1  = (e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7);
      const ch  = (e&f)^(~e&g);
      const t1  = (hh + S1 + ch + K[j] + w[j]) | 0;
      const S0  = (a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10);
      const maj = (a&b)^(a&c)^(b&c);
      const t2  = (S0 + maj) | 0;
      hh=g; g=f; f=e; e=(d+t1)|0; d=c; c=b; b=a; a=(t1+t2)|0;
    }
    h0=(h0+a)|0; h1=(h1+b)|0; h2=(h2+c)|0; h3=(h3+d)|0;
    h4=(h4+e)|0; h5=(h5+f)|0; h6=(h6+g)|0; h7=(h7+hh)|0;
  }

  const out = new Uint8Array(32);
  const odv = new DataView(out.buffer);
  [h0,h1,h2,h3,h4,h5,h6,h7].forEach((v,i) => odv.setUint32(i*4, v, false));
  return out;
}

// ─── HMAC-SHA256 ─────────────────────────────────────────────────────────────
function hmacSha256(key, data) {
  const BLOCK = 64;
  let k = key instanceof Uint8Array ? key : new TextEncoder().encode(key);
  if (k.length > BLOCK) k = sha256(k);
  const kpad = new Uint8Array(BLOCK);
  kpad.set(k);
  const ipad = kpad.map(b => b ^ 0x36);
  const opad = kpad.map(b => b ^ 0x5c);
  const inner = new Uint8Array(BLOCK + data.length);
  inner.set(ipad); inner.set(data, BLOCK);
  const outer = new Uint8Array(BLOCK + 32);
  outer.set(opad); outer.set(sha256(inner), BLOCK);
  return sha256(outer);
}

// ─── PBKDF2-HMAC-SHA256 (sync) ───────────────────────────────────────────────
function pbkdf2Sync(password, salt, iterations, keylen) {
  const pw   = password instanceof Uint8Array ? password : new TextEncoder().encode(password);
  const sl   = salt instanceof Uint8Array ? salt : new TextEncoder().encode(salt);
  const hlen = 32;
  const blocks = Math.ceil(keylen / hlen);
  const dk = new Uint8Array(keylen);

  for (let i = 1; i <= blocks; i++) {
    const ibuf = new Uint8Array(4);
    new DataView(ibuf.buffer).setUint32(0, i, false);
    const saltI = new Uint8Array(sl.length + 4);
    saltI.set(sl);
    saltI.set(ibuf, sl.length);

    let U = hmacSha256(pw, saltI);
    const T = new Uint8Array(U);
    for (let j = 1; j < iterations; j++) {
      U = hmacSha256(pw, U);
      for (let k = 0; k < hlen; k++) T[k] ^= U[k];
    }
    const offset = (i - 1) * hlen;
    dk.set(T.slice(0, keylen - offset), offset);
  }
  return dk;
}

// ─── Exports ─────────────────────────────────────────────────────────────────
export function randomBytes(n) {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  return a;
}

export function randomUUID() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

export function createHash(alg) {
  const chunks = [];
  return {
    update(d) {
      chunks.push(d instanceof Uint8Array ? d : new TextEncoder().encode(String(d)));
      return this;
    },
    digest(enc = 'hex') {
      const total = chunks.reduce((s, c) => s + c.length, 0);
      const buf = new Uint8Array(total);
      let off = 0;
      for (const c of chunks) { buf.set(c, off); off += c.length; }
      const hash = sha256(buf);
      if (enc === 'hex') return Array.from(hash).map(b => b.toString(16).padStart(2,'0')).join('');
      if (enc === 'base64') return btoa(String.fromCharCode(...hash));
      return hash;
    },
  };
}

export function scryptSync(password, salt, keylen, options = {}) {
  const N = options.N ?? 16384;
  const iterations = Math.max(1000, Math.round(Math.log2(N) * 1000));
  const pw = typeof password === 'string' ? new TextEncoder().encode(password) : password;
  const sl = typeof salt === 'string' ? new TextEncoder().encode(salt) : salt;
  return pbkdf2Sync(pw, sl, iterations, keylen);
}

export function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export function generateKeyPairSync() {
  throw new Error('generateKeyPairSync is not implemented in this environment');
}

export function createHmac() {
  throw new Error('createHmac is not implemented in this environment');
}

export function createCipheriv() {
  throw new Error('createCipheriv is not implemented in this environment');
}

export function createDecipheriv() {
  throw new Error('createDecipheriv is not implemented in this environment');
}

export function createSign() {
  throw new Error('createSign is not implemented in this environment');
}

export default { randomBytes, randomUUID, createHash, scryptSync, timingSafeEqual, generateKeyPairSync, createHmac, createCipheriv, createDecipheriv, createSign };