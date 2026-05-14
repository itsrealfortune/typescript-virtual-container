class BrowserBuffer extends Uint8Array {
    static from(data, encoding) {
        if (typeof data === 'string') {
            const enc = encoding || 'utf8';
            if (enc === 'hex') {
                const arr = new BrowserBuffer(data.length / 2);
                for (let i = 0; i < arr.length; i++)
                    arr[i] = parseInt(data.slice(i * 2, i * 2 + 2), 16);
                return arr;
            }
            if (enc === 'base64') {
                const bin = atob(data);
                const arr = new BrowserBuffer(bin.length);
                for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
                return arr;
            }
            return new BrowserBuffer(new TextEncoder().encode(data));
        }
        if (data instanceof ArrayBuffer) return new BrowserBuffer(data);
        return new BrowserBuffer(data);
    }

    static alloc(size, fill = 0) {
        return new BrowserBuffer(size).fill(fill);
    }

    static allocUnsafe(size) {
        return new BrowserBuffer(size);
    }

    static isBuffer(obj) {
        return obj instanceof BrowserBuffer || obj instanceof Uint8Array;
    }

    static concat(bufs, totalLength) {
        const len = totalLength ?? bufs.reduce((s, b) => s + b.length, 0);
        const out = new BrowserBuffer(len);
        let offset = 0;
        for (const b of bufs) { out.set(b, offset); offset += b.length; }
        return out;
    }

    static byteLength(str, enc = 'utf8') {
        if (enc === 'hex') return str.length / 2;
        if (enc === 'base64') return Math.floor(str.length * 3 / 4);
        return new TextEncoder().encode(str).length;
    }

    // ── write methods ──────────────────────────────────────────────────────────
    writeUInt8(val, offset = 0) { this[offset] = val & 0xff; return offset + 1; }
    writeInt8(val, offset = 0) { this[offset] = val & 0xff; return offset + 1; }

    writeUInt16BE(val, offset = 0) { this[offset] = (val >>> 8) & 0xff; this[offset + 1] = val & 0xff; return offset + 2; }
    writeUInt16LE(val, offset = 0) { this[offset] = val & 0xff; this[offset + 1] = (val >>> 8) & 0xff; return offset + 2; }
    writeInt16BE(val, offset = 0) { return this.writeUInt16BE(val, offset); }
    writeInt16LE(val, offset = 0) { return this.writeUInt16LE(val, offset); }

    writeUInt32BE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setUint32(0, val, false); return offset + 4; }
    writeUInt32LE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setUint32(0, val, true); return offset + 4; }
    writeInt32BE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setInt32(0, val, false); return offset + 4; }
    writeInt32LE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setInt32(0, val, true); return offset + 4; }

    writeBigUInt64BE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setBigUint64(0, BigInt(val), false); return offset + 8; }
    writeBigUInt64LE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setBigUint64(0, BigInt(val), true); return offset + 8; }

    writeFloatBE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setFloat32(0, val, false); return offset + 4; }
    writeFloatLE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setFloat32(0, val, true); return offset + 4; }
    writeDoubleBE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setFloat64(0, val, false); return offset + 8; }
    writeDoubleLE(val, offset = 0) { new DataView(this.buffer, this.byteOffset + offset).setFloat64(0, val, true); return offset + 8; }

    // ── read methods ───────────────────────────────────────────────────────────
    readUInt8(offset = 0) { return this[offset]; }
    readInt8(offset = 0) { const v = this[offset]; return v >= 128 ? v - 256 : v; }

    readUInt16BE(offset = 0) { return (this[offset] << 8) | this[offset + 1]; }
    readUInt16LE(offset = 0) { return this[offset] | (this[offset + 1] << 8); }
    readInt16BE(offset = 0) { const v = this.readUInt16BE(offset); return v >= 0x8000 ? v - 0x10000 : v; }
    readInt16LE(offset = 0) { const v = this.readUInt16LE(offset); return v >= 0x8000 ? v - 0x10000 : v; }

    readUInt32BE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getUint32(0, false); }
    readUInt32LE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getUint32(0, true); }
    readInt32BE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getInt32(0, false); }
    readInt32LE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getInt32(0, true); }

    readBigUInt64BE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getBigUint64(0, false); }
    readBigUInt64LE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getBigUint64(0, true); }

    readFloatBE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getFloat32(0, false); }
    readFloatLE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getFloat32(0, true); }
    readDoubleBE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getFloat64(0, false); }
    readDoubleLE(offset = 0) { return new DataView(this.buffer, this.byteOffset + offset).getFloat64(0, true); }

    // ── misc ───────────────────────────────────────────────────────────────────
    toString(enc = 'utf8', start = 0, end = this.length) {
        const slice = this.subarray(start, end);
        if (enc === 'hex') return Array.from(slice).map(b => b.toString(16).padStart(2, '0')).join('');
        if (enc === 'base64') return btoa(String.fromCharCode(...slice));
        return new TextDecoder(enc === 'utf8' ? 'utf-8' : enc).decode(slice);
    }

    copy(target, targetStart = 0, sourceStart = 0, sourceEnd = this.length) {
        target.set(this.subarray(sourceStart, sourceEnd), targetStart);
    }
    equals(other) {
        if (this.length !== other.length) return false;
        for (let i = 0; i < this.length; i++)
            if (this[i] !== other[i]) return false;
        return true;
    }

    slice(start, end) { return new BrowserBuffer(super.slice(start, end)); }
    subarray(start, end) { return new BrowserBuffer(super.subarray(start, end)); }

    get length() { return this.byteLength; }
}

globalThis.Buffer = BrowserBuffer;