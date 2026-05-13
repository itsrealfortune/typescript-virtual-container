// minimal Buffer shim backed by Uint8Array
const Buffer = {
  from(data, encoding) {
    if (typeof data === 'string') {
      const enc = encoding || 'utf8';
      if (enc === 'hex') {
        const arr = new Uint8Array(data.length / 2);
        for (let i = 0; i < arr.length; i++)
          arr[i] = parseInt(data.slice(i*2, i*2+2), 16);
        return arr;
      }
      return new TextEncoder().encode(data);
    }
    if (data instanceof ArrayBuffer) return new Uint8Array(data);
    return new Uint8Array(data);
  },
  alloc(size, fill = 0) {
    return new Uint8Array(size).fill(fill);
  },
  allocUnsafe(size) {
    return new Uint8Array(size);
  },
  isBuffer(obj) {
    return obj instanceof Uint8Array;
  },
  concat(bufs, totalLength) {
    const len = totalLength ?? bufs.reduce((s, b) => s + b.length, 0);
    const out = new Uint8Array(len);
    let offset = 0;
    for (const b of bufs) { out.set(b, offset); offset += b.length; }
    return out;
  },
  byteLength(str, enc = 'utf8') {
    if (enc === 'hex') return str.length / 2;
    return new TextEncoder().encode(str).length;
  },
};
globalThis.Buffer = Buffer;