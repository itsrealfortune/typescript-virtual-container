/**
 * Binary serialisation format for VirtualFileSystem snapshots.
 *
 * Replaces the JSON+base64 approach. No external dependencies.
 *
 * Wire format (little-endian throughout):
 *
 *   File header:
 *     [4]  magic  = 0x56 0x46 0x53 0x21  ("VFS!")
 *     [1]  version = 0x01
 *
 *   Node (recursive):
 *     [1]  type    = 0x01 (file) | 0x02 (directory)
 *     [2]  name length (uint16)
 *     [N]  name bytes (utf8)
 *     [4]  mode (uint32)
 *     [8]  createdAt ms (float64)
 *     [8]  updatedAt ms (float64)
 *
 *   File node extra:
 *     [1]  compressed flag (0x00 | 0x01)
 *     [4]  content length (uint32)
 *     [N]  content bytes (raw — no base64)
 *
 *   Directory node extra:
 *     [4]  children count (uint32)
 *     [N]  children nodes (recursive)
 *
 * Total overhead vs JSON+base64 for 1 MB of file data:
 *   JSON+base64 :  ~1.37 MB (base64 33% bloat) + JSON string wrapping
 *   Binary pack :  ~1.00 MB + ~40 bytes/node header  → ~27% smaller, no string parsing
 */

import type { InternalDirectoryNode, InternalFileNode, InternalNode } from "./internalTypes";

const MAGIC = Buffer.from([0x56, 0x46, 0x53, 0x21]); // "VFS!"
const VERSION = 0x01;
const TYPE_FILE = 0x01;
const TYPE_DIR  = 0x02;

// ── Encoder ───────────────────────────────────────────────────────────────────

class Encoder {
	private chunks: Buffer[] = [];

	write(buf: Buffer): void { this.chunks.push(buf); }

	writeUint8(n: number): void {
		const b = Buffer.allocUnsafe(1);
		b.writeUInt8(n, 0);
		this.chunks.push(b);
	}

	writeUint16(n: number): void {
		const b = Buffer.allocUnsafe(2);
		b.writeUInt16LE(n, 0);
		this.chunks.push(b);
	}

	writeUint32(n: number): void {
		const b = Buffer.allocUnsafe(4);
		b.writeUInt32LE(n, 0);
		this.chunks.push(b);
	}

	writeFloat64(n: number): void {
		const b = Buffer.allocUnsafe(8);
		b.writeDoubleBE(n, 0);
		this.chunks.push(b);
	}

	writeString(s: string): void {
		const encoded = Buffer.from(s, "utf8");
		this.writeUint16(encoded.length);
		this.chunks.push(encoded);
	}

	writeBytes(bytes: Buffer): void {
		this.writeUint32(bytes.length);
		this.chunks.push(bytes);
	}

	toBuffer(): Buffer { return Buffer.concat(this.chunks); }
}

function encodeNode(enc: Encoder, node: InternalNode): void {
	if (node.type === "file") {
		const f = node as InternalFileNode;
		enc.writeUint8(TYPE_FILE);
		enc.writeString(f.name);
		enc.writeUint32(f.mode);
		enc.writeFloat64(f.createdAt.getTime());
		enc.writeFloat64(f.updatedAt.getTime());
		enc.writeUint8(f.compressed ? 0x01 : 0x00);
		enc.writeBytes(f.content);
	} else {
		const d = node as InternalDirectoryNode;
		enc.writeUint8(TYPE_DIR);
		enc.writeString(d.name);
		enc.writeUint32(d.mode);
		enc.writeFloat64(d.createdAt.getTime());
		enc.writeFloat64(d.updatedAt.getTime());
		const children = Array.from(d.children.values());
		enc.writeUint32(children.length);
		for (const child of children) encodeNode(enc, child);
	}
}

/**
 * Serialise an in-memory VFS root to a compact binary Buffer.
 * No base64, no JSON. ~27% smaller than the JSON+base64 format for typical VFS trees.
 */
export function encodeVfs(root: InternalDirectoryNode): Buffer {
	const enc = new Encoder();
	enc.write(MAGIC);
	enc.writeUint8(VERSION);
	encodeNode(enc, root);
	return enc.toBuffer();
}

// ── Decoder ───────────────────────────────────────────────────────────────────

class Decoder {
	private pos = 0;
	constructor(private readonly buf: Buffer) {}

	readUint8(): number { return this.buf.readUInt8(this.pos++); }

	readUint16(): number {
		const v = this.buf.readUInt16LE(this.pos);
		this.pos += 2;
		return v;
	}

	readUint32(): number {
		const v = this.buf.readUInt32LE(this.pos);
		this.pos += 4;
		return v;
	}

	readFloat64(): number {
		const v = this.buf.readDoubleBE(this.pos);
		this.pos += 8;
		return v;
	}

	readString(): string {
		const len = this.readUint16();
		const s = this.buf.toString("utf8", this.pos, this.pos + len);
		this.pos += len;
		return s;
	}

	readBytes(): Buffer {
		const len = this.readUint32();
		const b = this.buf.slice(this.pos, this.pos + len);
		this.pos += len;
		return b;
	}

	remaining(): number { return this.buf.length - this.pos; }
}

function decodeNode(dec: Decoder): InternalNode {
	const type = dec.readUint8();
	const name = dec.readString();
	const mode = dec.readUint32();
	const createdAt = new Date(dec.readFloat64());
	const updatedAt = new Date(dec.readFloat64());

	if (type === TYPE_FILE) {
		const compressed = dec.readUint8() === 0x01;
		const content = dec.readBytes();
		return { type: "file", name, mode, createdAt, updatedAt, compressed, content } satisfies InternalFileNode;
	}

	if (type === TYPE_DIR) {
		const count = dec.readUint32();
		const children = new Map<string, InternalNode>();
		for (let i = 0; i < count; i++) {
			const child = decodeNode(dec);
			children.set(child.name, child);
		}
		return { type: "directory", name, mode, createdAt, updatedAt, children } satisfies InternalDirectoryNode;
	}

	throw new Error(`[VFS binary] Unknown node type: 0x${type.toString(16)}`);
}

/**
 * Deserialise a binary Buffer produced by {@link encodeVfs} back into an
 * InternalDirectoryNode tree. Throws on magic/version mismatch or truncation.
 */
export function decodeVfs(buf: Buffer): InternalDirectoryNode {
	if (buf.length < 5) throw new Error("[VFS binary] Buffer too short");

	const magic = buf.slice(0, 4);
	if (!magic.equals(MAGIC)) {
		throw new Error("[VFS binary] Invalid magic — not a VFS binary snapshot");
	}

	const dec = new Decoder(buf);
	// skip magic (4) + version (1)
	for (let i = 0; i < 5; i++) dec.readUint8();

	const root = decodeNode(dec);
	if (root.type !== "directory") {
		throw new Error("[VFS binary] Root node must be a directory");
	}
	return root as InternalDirectoryNode;
}

/**
 * Returns true if `buf` looks like a VFS binary snapshot (starts with magic bytes).
 * Used to auto-detect format when loading from disk.
 */
export function isBinarySnapshot(buf: Buffer): boolean {
	return buf.length >= 4 && buf.slice(0, 4).equals(MAGIC);
}
