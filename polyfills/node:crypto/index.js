// Minimal crypto shim using Web Crypto where possible; fallback simple hashes.
export function randomBytes(n){ const a=new Uint8Array(n); crypto.getRandomValues(a); return a; }
export function randomUUID(){ return crypto.randomUUID ? crypto.randomUUID() : Math.floor(Math.random()*1e9).toString(16); }
export function createHash(alg){ let data=''; return { update(d){ data += String(d); return this; }, digest(enc='hex'){ // simple hash fallback
    let h=0; for(let i=0;i<data.length;i++) h=(h*31+data.charCodeAt(i))|0; const s=(h>>>0).toString(16); return enc==='hex'?s:s; } }; }
export function scryptSync(){ throw new Error('scryptSync not implemented in browser shim'); }
export default { randomBytes, randomUUID, createHash, scryptSync };
