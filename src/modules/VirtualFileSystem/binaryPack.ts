/**
 * Binary serialisation format for VirtualFileSystem snapshots.
 *
 * Replaces the JSON+base64 approach. No external dependencies.
 *
 * Wire format (little-endian throughout):
 *
 *   File header:
 *     [4]  magic  = 0x56 0x46 0x53 0x21  ("VFS!")
 *     [1]  version = 0x02
 *
 *   Node (recursive):
 *     [1]  type    = 0x01 (file) | 0x02 (directory)
 *     [2]  name length (uint16)
 *     [N]  name bytes (utf8)
 *     [4]  mode (uint32)
 *     [4]  uid (uint32)
 *     [4]  gid (uint32)
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

import type {
	InternalDeviceNode,
	InternalDirectoryNode,
	InternalFileNode,
	InternalNode,
	InternalStubNode,
} from "./internalTypes";

const MAGIC = Buffer.from([0x56, 0x46, 0x53, 0x21]); // "VFS!"
const VERSION = 0x03;
const TYPE_FILE = 0x01;
const TYPE_DIR = 0x02;
const TYPE_DEVICE = 0x03;

const DEVICE_KIND_MAP: Record<string, number> = {
	null: 0x01,
	zero: 0x02,
	full: 0x03,
	random: 0x04,
	urandom: 0x05,
	tty: 0x06,
	console: 0x07,
	ptmx: 0x08,
	stdin: 0x09,
	stdout: 0x0a,
	stderr: 0x0b,
};

const DEVICE_KIND_REVERSE: Record<number, string> = {};
for (const [k, v] of Object.entries(DEVICE_KIND_MAP)) {
	DEVICE_KIND_REVERSE[v] = k;
}

// ── Encoder ───────────────────────────────────────────────────────────────────

class Encoder {
	private _chunks: Buffer[] = [];

	write(buf: Buffer): void {
		this._chunks.push(buf);
	}

	writeUint8(n: number): void {
		const b = Buffer.allocUnsafe(1);
		b.writeUInt8(n, 0);
		this._chunks.push(b);
	}

	writeUint16(n: number): void {
		const b = Buffer.allocUnsafe(2);
		b.writeUInt16LE(n, 0);
		this._chunks.push(b);
	}

	writeUint32(n: number): void {
		const b = Buffer.allocUnsafe(4);
		b.writeUInt32LE(n, 0);
		this._chunks.push(b);
	}

	writeFloat64(n: number): void {
		const b = Buffer.allocUnsafe(8);
		b.writeDoubleBE(n, 0);
		this._chunks.push(b);
	}

	writeString(s: string): void {
		const encoded = Buffer.from(s, "utf8");
		this.writeUint16(encoded.length);
		this._chunks.push(encoded);
	}

	writeBytes(bytes: Buffer): void {
		this.writeUint32(bytes.length);
		this._chunks.push(bytes);
	}

	toBuffer(): Buffer {
		return Buffer.concat(this._chunks);
	}
}

function encodeNode(enc: Encoder, node: InternalNode): void {
	if (node.type === "file") {
		const f = node as InternalFileNode;
		enc.writeUint8(TYPE_FILE);
		enc.writeString(f.name);
		enc.writeUint32(f.mode);
		enc.writeUint32(f.uid);
		enc.writeUint32(f.gid);
		enc.writeFloat64(f.createdAt);
		enc.writeFloat64(f.updatedAt);
		enc.writeUint8(f.compressed ? 0x01 : 0x00);
		enc.writeBytes(f.content);
	} else if (node.type === "stub") {
		const s = node as InternalStubNode;
		enc.writeUint8(TYPE_FILE);
		enc.writeString(s.name);
		enc.writeUint32(s.mode);
		enc.writeUint32(s.uid);
		enc.writeUint32(s.gid);
		enc.writeFloat64(s.createdAt);
		enc.writeFloat64(s.updatedAt);
		enc.writeUint8(0x00);
		enc.writeBytes(Buffer.from(s.stubContent, "utf8"));
	} else if (node.type === "device") {
		const d = node as InternalDeviceNode;
		enc.writeUint8(TYPE_DEVICE);
		enc.writeString(d.name);
		enc.writeUint32(d.mode);
		enc.writeUint32(d.uid);
		enc.writeUint32(d.gid);
		enc.writeFloat64(d.createdAt);
		enc.writeFloat64(d.updatedAt);
		enc.writeUint8(DEVICE_KIND_MAP[d.deviceKind] ?? 0x00);
		enc.writeUint8(d.major);
		enc.writeUint8(d.minor);
	} else {
		const d = node as InternalDirectoryNode;
		enc.writeUint8(TYPE_DIR);
		enc.writeString(d.name);
		enc.writeUint32(d.mode);
		enc.writeUint32(d.uid);
		enc.writeUint32(d.gid);
		enc.writeFloat64(d.createdAt);
		enc.writeFloat64(d.updatedAt);
		const children = Object.values(d.children);
		enc.writeUint32(children.length);
		for (const child of children) {
			encodeNode(enc, child);
		}
	}
}

/**
 * Serialise an in-memory VFS root to a compact binary Buffer.
 * No base64, no JSON. ~27% smaller than the JSON+base64 format for typical VFS trees.
 * @param root - Root directory node to serialise.
 * @returns Binary Buffer in VFS! format.
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
	private _pos = 0;
	constructor(private readonly buf: Buffer) {}

	readUint8(): number {
		return this.buf.readUInt8(this._pos++);
	}

	readUint16(): number {
		const v = this.buf.readUInt16LE(this._pos);
		this._pos += 2;
		return v;
	}

	readUint32(): number {
		const v = this.buf.readUInt32LE(this._pos);
		this._pos += 4;
		return v;
	}

	readFloat64(): number {
		const v = this.buf.readDoubleBE(this._pos);
		this._pos += 8;
		return v;
	}

	readString(): string {
		const len = this.readUint16();
		const s = this.buf.toString("utf8", this._pos, this._pos + len);
		this._pos += len;
		return s;
	}

	readBytes(): Buffer {
		const len = this.readUint32();
		const b = this.buf.slice(this._pos, this._pos + len);
		this._pos += len;
		return b;
	}

	remaining(): number {
		return this.buf.length - this._pos;
	}
}

function decodeNode(dec: Decoder, includeUidGid: boolean): InternalNode {
	const type = dec.readUint8();
	const name = internName(dec.readString());
	const mode = dec.readUint32();
	const uid = includeUidGid ? dec.readUint32() : 0;
	const gid = includeUidGid ? dec.readUint32() : 0;
	const createdAt = dec.readFloat64();
	const updatedAt = dec.readFloat64();

	if (type === TYPE_FILE) {
		const compressed = dec.readUint8() === 0x01;
		const content = dec.readBytes();
		return {
			type: "file",
			name,
			mode,
			uid,
			gid,
			createdAt,
			updatedAt,
			compressed,
			content,
		} satisfies InternalFileNode;
	}

	if (type === TYPE_DEVICE) {
		const kindCode = dec.readUint8();
		const major = dec.readUint8();
		const minor = dec.readUint8();
		const deviceKind = DEVICE_KIND_REVERSE[kindCode] ?? "null";
		return {
			type: "device",
			name,
			mode,
			uid,
			gid,
			createdAt,
			updatedAt,
			deviceKind: deviceKind as InternalDeviceNode["deviceKind"],
			major,
			minor,
		} satisfies InternalDeviceNode;
	}

	if (type === TYPE_DIR) {
		const count = dec.readUint32();
		const children = Object.create(null) as Record<string, InternalNode>;
		for (let i = 0; i < count; i++) {
			const child = decodeNode(dec, includeUidGid);
			children[child.name] = child;
		}
		return {
			type: "directory",
			name,
			mode,
			uid,
			gid,
			createdAt,
			updatedAt,
			children,
			_childCount: count,
			_sortedKeys: null,
		} satisfies InternalDirectoryNode;
	}

	throw new Error(`[VFS binary] Unknown node type: 0x${type.toString(16)}`);
}

// String intern pool for node names — avoids duplicate string allocations per decode call.
// Names like "bin", "etc", "usr", "passwd" appear in every shell's tree.
const _namePool = new Map<string, string>();
const _maxNamePoolSize = 500;
function internName(s: string): string {
	const cached = _namePool.get(s);
	if (cached !== undefined) {
		return cached;
	}
	if (_namePool.size >= _maxNamePoolSize) {
		// Evict first 25% of entries (simple LRU approximation)
		const toRemove = Math.floor(_maxNamePoolSize / 4);
		const keys = [..._namePool.keys()];
		for (let i = 0; i < toRemove; i++) {
			_namePool.delete(keys[i] as string);
		}
	}
	_namePool.set(s, s);
	return s;
}

/**
 * Shallow-fork a decoded rootfs tree: creates new InternalDirectoryNode objects
 * (necessary for per-shell write isolation) but shares all InternalFileNode and
 * InternalStubNode references. Safe because file/stub nodes are never mutated in-place
 * — writes replace the parent's children[name] reference with a new node.
 * @param base - Root directory node to fork.
 * @returns New root directory node with shared file/stub references.
 */
export function forkDirTree(
	base: InternalDirectoryNode
): InternalDirectoryNode {
	const children = Object.create(null) as Record<string, InternalNode>;
	for (const name of Object.keys(base.children)) {
		const child = base.children[name] as InternalNode;
		children[name] =
			child.type === "directory"
				? forkDirTree(child as InternalDirectoryNode)
				: child;
	}
	return {
		type: "directory",
		name: base.name,
		mode: base.mode,
		uid: base.uid,
		gid: base.gid,
		createdAt: base.createdAt,
		updatedAt: base.updatedAt,
		children,
		_childCount: base._childCount,
		_sortedKeys: base._sortedKeys,
	};
}

/**
 * Deserialise a binary Buffer produced by {@link encodeVfs} back into an
 * InternalDirectoryNode tree. Throws on magic/version mismatch or truncation.
 * @param buf - Binary Buffer in VFS! format.
 * @returns Reconstructed root directory node.
 */
export function decodeVfs(buf: Buffer): InternalDirectoryNode {
	if (buf.length < 5) {
		throw new Error("[VFS binary] Buffer too short");
	}

	const magic = buf.slice(0, 4);
	if (!magic.equals(MAGIC)) {
		throw new Error("[VFS binary] Invalid magic — not a VFS binary snapshot");
	}

	const dec = new Decoder(buf);
	// skip magic (4)
	dec.readUint8();
	dec.readUint8();
	dec.readUint8();
	dec.readUint8();
	const version = dec.readUint8();
	const includeUidGid = version >= 0x02;

	const root = decodeNode(dec, includeUidGid);
	if (root.type !== "directory") {
		throw new Error("[VFS binary] Root node must be a directory");
	}
	return root as InternalDirectoryNode;
}

/**
 * Checks whether `buf` starts with the VFS binary magic bytes, indicating a valid
 * binary snapshot produced by {@link encodeVfs}.
 * @param buf - The buffer to inspect.
 * @returns `true` if the buffer begins with the VFS magic header (`"VFS!"`).
 */
export function isBinarySnapshot(buf: Buffer): boolean {
	return buf.length >= 4 && buf.slice(0, 4).equals(MAGIC);
}
