import { gunzipSync } from "fflate";
import type {
	DeviceKind,
	InternalDeviceNode,
	InternalDirectoryNode,
	InternalFileNode,
	InternalNode,
} from "./internalTypes";

// ── POSIX ustar constants ───────────────────────────────────────────────────

const TAR_BLOCK = 512;
const TAR_END = Buffer.alloc(1024); // two zero blocks
const MAGIC_OFFSET = 257;
const MAGIC = "ustar\0";

// ── Detect ──────────────────────────────────────────────────────────────────

export function isTarFormat(buf: Buffer): boolean {
	return buf.slice(MAGIC_OFFSET, MAGIC_OFFSET + 6).toString("ascii") === MAGIC;
}

// ── Encoding (VFS tree → tar) ──────────────────────────────────────────────

function makeOctal(val: number, len: number): string {
	return `${val.toString(8).padStart(len - 1, "0")}\0`;
}

function makeTarHeader(
	name: string,
	size: number,
	isDir: boolean,
	opts: {
		mode: number;
		uid: number;
		gid: number;
		mtime: number;
		linkname?: string;
		typeflag?: number;
		devmajor?: number;
		devminor?: number;
	}
): Buffer {
	const hdr = Buffer.alloc(TAR_BLOCK);
	const enc = (s: string, off: number, len: number) => {
		const b = Buffer.from(s, "ascii");
		b.copy(hdr, off, 0, Math.min(b.length, len));
	};

	const displayName = isDir && !name.endsWith("/") ? `${name}/` : name;
	const typeflag = opts.typeflag ?? (isDir ? 0x35 : 0x30);

	encodePath(displayName, hdr);
	enc(makeOctal(opts.mode, 8), 100, 8);
	enc(makeOctal(opts.uid, 8), 108, 8);
	enc(makeOctal(opts.gid, 8), 116, 8);
	enc(makeOctal(size, 12), 124, 12);
	enc(makeOctal(Math.floor(opts.mtime / 1000), 12), 136, 12);
	hdr[156] = typeflag;
	if (opts.linkname) {
		enc(opts.linkname, 157, 100);
	}
	enc(MAGIC, 257, 6);
	enc("00", 263, 2);
	enc("root\0", 265, 32);
	enc("root\0", 297, 32);
	if (opts.devmajor !== undefined) {
		enc(makeOctal(opts.devmajor, 8), 329, 8);
	}
	if (opts.devminor !== undefined) {
		enc(makeOctal(opts.devminor, 8), 337, 8);
	}

	// Checksum
	for (let i = 148; i < 156; i++) {
		hdr[i] = 0x20;
	}
	let sum = 0;
	for (let i = 0; i < TAR_BLOCK; i++) {
		sum += hdr[i] as number;
	}
	Buffer.from(`${makeOctal(sum, 7)} `).copy(hdr, 148);

	return hdr;
}

function encodePath(name: string, hdr: Buffer): void {
	const enc = (s: string, off: number, len: number) => {
		const b = Buffer.from(s, "ascii");
		b.copy(hdr, off, 0, Math.min(b.length, len));
	};
	if (Buffer.byteLength(name, "ascii") <= 100) {
		enc(name, 0, 100);
	} else {
		const splitAt = name.lastIndexOf("/", name.length - 101);
		if (splitAt > 0 && splitAt <= 155) {
			const prefix = name.slice(0, splitAt);
			const base = name.slice(splitAt + 1);
			enc(prefix, 345, 155);
			enc(base, 0, 100);
		} else {
			enc(name, 0, 100);
		}
	}
}

function padBlock(size: number): Buffer {
	const rem = size % TAR_BLOCK;
	return rem === 0 ? Buffer.alloc(0) : Buffer.alloc(TAR_BLOCK - rem);
}

function buildTar(entries: TarEntry[]): Buffer {
	const parts: Buffer[] = [];
	for (const e of entries) {
		const hdr = makeTarHeader(
			e.name,
			e.isDir ? 0 : e.content.length,
			e.isDir,
			e
		);
		parts.push(hdr);
		if (!e.isDir && e.content.length > 0) {
			parts.push(e.content);
			parts.push(padBlock(e.content.length));
		}
	}
	parts.push(TAR_END);
	return Buffer.concat(parts);
}

interface TarEntry {
	name: string;
	content: Buffer;
	isDir: boolean;
	mode: number;
	uid: number;
	gid: number;
	mtime: number;
	linkname?: string;
	typeflag?: number;
	devmajor?: number;
	devminor?: number;
}

function collectEntries(
	dir: InternalDirectoryNode,
	prefix: string,
	entries: TarEntry[]
): void {
	for (const node of Object.values(dir.children)) {
		const fullPath = prefix ? `${prefix}/${node.name}` : `/${node.name}`;
		if (node.type === "directory") {
			entries.push({
				name: fullPath,
				content: Buffer.alloc(0),
				isDir: true,
				mode: node.mode,
				uid: node.uid,
				gid: node.gid,
				mtime: node.updatedAt,
			});
			collectEntries(node, fullPath, entries);
		} else if (node.type === "file") {
			const isSymlink = node.mode === 0o120777;
			entries.push({
				name: fullPath,
				content: isSymlink ? Buffer.alloc(0) : node.content,
				isDir: false,
				mode: node.mode,
				uid: node.uid,
				gid: node.gid,
				mtime: node.updatedAt,
				linkname: isSymlink ? node.content.toString("utf8") : undefined,
				typeflag: isSymlink ? 0x32 : 0x30, // '2' for symlink, '0' for file
			});
		} else if (node.type === "stub") {
			entries.push({
				name: fullPath,
				content: Buffer.from(node.stubContent, "utf8"),
				isDir: false,
				mode: node.mode,
				uid: node.uid,
				gid: node.gid,
				mtime: node.updatedAt,
			});
		} else if (node.type === "device") {
			entries.push({
				name: fullPath,
				content: Buffer.alloc(0),
				isDir: false,
				mode: node.mode,
				uid: node.uid,
				gid: node.gid,
				mtime: node.updatedAt,
				typeflag: 0x33, // '3' — character device
				devmajor: node.major,
				devminor: node.minor,
			});
		}
	}
}

export function encodeTar(root: InternalDirectoryNode): Buffer {
	if (root.name !== "") {
		throw new Error("encodeTar: root must be unnamed (name === '')");
	}
	const entries: TarEntry[] = [
		{
			name: "/",
			content: Buffer.alloc(0),
			isDir: true,
			mode: root.mode,
			uid: root.uid,
			gid: root.gid,
			mtime: root.updatedAt,
		},
	];
	collectEntries(root, "", entries);
	return buildTar(entries);
}

// ── Decoding (tar → VFS tree) ──────────────────────────────────────────────

interface TarFile {
	name: string;
	content: Buffer;
	mode: number;
	uid: number;
	gid: number;
	mtime: number;
	typeflag: number;
	linkname: string;
	devmajor: number;
	devminor: number;
}

function parseOctal(str: string): number {
	const cleaned = str.replace(/\0/g, "").trim();
	return cleaned ? Number.parseInt(cleaned, 8) || 0 : 0;
}

function parseTar(raw: Buffer): TarFile[] {
	const files: TarFile[] = [];
	let off = 0;
	while (off + TAR_BLOCK <= raw.length) {
		const hdr = raw.slice(off, off + TAR_BLOCK);
		if (hdr.every((b) => b === 0)) {
			break;
		}
		const magic = hdr.slice(MAGIC_OFFSET, MAGIC_OFFSET + 6).toString("ascii");
		if (magic !== "ustar\0" && magic !== "ustar ") {
			// Not ustar — skip block
			off += TAR_BLOCK;
			continue;
		}

		const prefix = hdr
			.slice(345, 500)
			.toString("ascii")
			.replace(/\0.*/, "")
			.trim();
		const namePart = hdr
			.slice(0, 100)
			.toString("ascii")
			.replace(/\0.*/, "")
			.trim();
		const name = prefix ? `${prefix}/${namePart}` : namePart;
		const size = parseOctal(hdr.slice(124, 135).toString("ascii"));
		const typeflag = hdr[156] ?? 0;
		const mode = parseOctal(hdr.slice(100, 107).toString("ascii"));
		const uid = parseOctal(hdr.slice(108, 115).toString("ascii"));
		const gid = parseOctal(hdr.slice(116, 123).toString("ascii"));
		const mtimeStr = hdr
			.slice(136, 147)
			.toString("ascii")
			.replace(/\0.*/, "")
			.trim();
		const mtime = mtimeStr ? Number.parseInt(mtimeStr, 8) * 1000 : Date.now();
		const linkname = hdr
			.slice(157, 257)
			.toString("ascii")
			.replace(/\0.*/, "")
			.trim();
		const devmajor = parseOctal(hdr.slice(329, 336).toString("ascii"));
		const devminor = parseOctal(hdr.slice(337, 344).toString("ascii"));

		off += TAR_BLOCK;
		const content = raw.slice(off, off + size);
		off += Math.ceil(size / TAR_BLOCK) * TAR_BLOCK;

		// Skip global extended headers (typeflag 'g') and pax extended headers ('x')
		if (typeflag === 0x67 || typeflag === 0x78) {
			continue;
		}

		files.push({
			name,
			content,
			mode,
			uid,
			gid,
			mtime,
			typeflag,
			linkname,
			devmajor,
			devminor,
		});
	}
	return files;
}

function makeDir(
	name: string,
	mode: number,
	uid: number,
	gid: number,
	mtime: number
): InternalDirectoryNode {
	return {
		type: "directory",
		name,
		mode,
		uid,
		gid,
		createdAt: mtime,
		updatedAt: mtime,
		children: Object.create(null) as Record<string, InternalNode>,
		_childCount: 0,
		_sortedKeys: null,
	};
}

function makeFile(
	name: string,
	content: Buffer,
	mode: number,
	uid: number,
	gid: number,
	mtime: number
): InternalFileNode {
	return {
		type: "file",
		name,
		content,
		mode,
		uid,
		gid,
		compressed: false,
		createdAt: mtime,
		updatedAt: mtime,
	};
}

function makeDevice(
	name: string,
	deviceKind: DeviceKind,
	mode: number,
	uid: number,
	gid: number,
	devmajor: number,
	devminor: number,
	mtime: number
): InternalDeviceNode {
	return {
		type: "device",
		name,
		deviceKind,
		mode,
		uid,
		gid,
		major: devmajor,
		minor: devminor,
		createdAt: mtime,
		updatedAt: mtime,
	};
}

function getDeviceKind(typeflag: number): DeviceKind | null {
	if (typeflag !== 0x33 && typeflag !== 0x34) {
		return null;
	}
	return "null";
}

/**
 * Decode a tar archive (POSIX ustar) into a VFS internal directory tree.
 * Supports gzip-compressed archives (auto-detected by magic bytes).
 */
export function decodeTar(buf: Buffer): InternalDirectoryNode {
	let raw = buf;

	// Auto-decompress gzip
	if (raw.length > 2 && raw[0] === 0x1f && raw[1] === 0x8b) {
		try {
			raw = Buffer.from(gunzipSync(raw));
		} catch {
			throw new Error("decodeTar: gzip decompression failed");
		}
	}

	const files = parseTar(raw);

	const root = makeDir("", 0o755, 0, 0, Date.now());

	for (const f of files) {
		const cleanName = f.name.replace(/\/$/, "");
		const parts = cleanName.split("/").filter(Boolean);
		if (parts.length === 0) {
			continue;
		}

		// Descend to parent directory
		let cur: InternalDirectoryNode = root;
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i] as string;
			let child = cur.children[part];
			if (!child) {
				child = makeDir(part, 0o755, f.uid, f.gid, f.mtime);
				cur.children[part] = child;
				cur._childCount++;
				cur._sortedKeys = null;
			}
			if (child.type !== "directory") {
				break;
			}
			cur = child;
		}

		const leafName = parts[parts.length - 1] as string;

		// Directory entry
		if (f.typeflag === 0x35) {
			if (!cur.children[leafName]) {
				cur.children[leafName] = makeDir(
					leafName,
					f.mode || 0o755,
					f.uid,
					f.gid,
					f.mtime
				);
				cur._childCount++;
				cur._sortedKeys = null;
			}
			continue;
		}

		// Symlink
		if (f.typeflag === 0x32 && f.linkname) {
			if (!cur.children[leafName]) {
				cur.children[leafName] = makeFile(
					leafName,
					Buffer.from(f.linkname, "utf8"),
					0o120777,
					f.uid,
					f.gid,
					f.mtime
				);
				cur._childCount++;
				cur._sortedKeys = null;
			}
			continue;
		}

		// Character device
		if (f.typeflag === 0x33) {
			const deviceKind = getDeviceKind(f.typeflag) ?? "null";
			if (!cur.children[leafName]) {
				cur.children[leafName] = makeDevice(
					leafName,
					deviceKind,
					f.mode || 0o666,
					f.uid,
					f.gid,
					f.devmajor,
					f.devminor,
					f.mtime
				);
				cur._childCount++;
				cur._sortedKeys = null;
			}
			continue;
		}

		// Regular file (typeflag 0x30 or 0x00 or unset)
		if (
			(f.typeflag === 0x30 || f.typeflag === 0x00 || f.typeflag === 0) &&
			!cur.children[leafName]
		) {
			cur.children[leafName] = makeFile(
				leafName,
				f.content,
				f.mode || 0o644,
				f.uid,
				f.gid,
				f.mtime
			);
			cur._childCount++;
			cur._sortedKeys = null;
		}
	}

	return root;
}

/**
 * Detect whether a buffer is a gzip-compressed tar archive.
 */
export function isGzipTar(buf: Buffer): boolean {
	return buf.length > 2 && buf[0] === 0x1f && buf[1] === 0x8b;
}
