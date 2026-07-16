import { unzlibSync } from "fflate";
import type { InternalDirectoryNode, InternalFileNode } from "./internalTypes";

const MAGIC = 0x73717368;

const COMP_GZIP = 1;

const INODE_DIR = 1;
const INODE_FILE = 2;
const INODE_SYMLINK = 3;
const INODE_BLKDEV = 4;
const INODE_CHRDEV = 5;
const INODE_FIFO = 6;
const INODE_SOCKET = 7;
const INODE_LDIR = 8;
const INODE_LFILE = 9;
const INODE_LSYMLINK = 10;

const COMPRESSED_BIT = 1 << 15;
const COMPRESSED_BIT_BLOCK = 1 << 24;

interface SquashfsSuperblock {
	blockSize: number;
	blockLog: number;
	compression: number;
	flags: number;
	inodeCount: number;
	modTime: number;
	rootInode: bigint;
	idCount: number;
	idTableStart: number;
	inodeTableStart: number;
	directoryTableStart: number;
	fragmentTableStart: number;
}

interface ParsedInode {
	inodeType: number;
	mode: number;
	uid: number;
	gid: number;
	mtime: number;
	inodeNumber: number;

	dirSize?: number;
	dirOffset?: number;
	dirStartBlock?: number;

	fileSize?: number;
	fileStartBlock?: number;
	fragmentIndex?: number;
	fragmentOffset?: number;
	blockSizes?: number[];

	symlinkTarget?: string;
}

interface DirEntry {
	inodeNumber: number;
	type: number;
	name: string;
}

interface FragmentEntry {
	startBlock: number;
	size: number;
}

interface MetadataBlockEntry {
	fileOffset: number;
	blockSize: number;
	compressed: boolean;
}

export function isSquashfsFormat(buf: Buffer): boolean {
	return buf.length >= 4 && buf.readUInt32LE(0) === MAGIC;
}

function parseSuperblock(buf: Buffer): SquashfsSuperblock {
	const blockSize = buf.readUInt32LE(12);
	const blockLog = Math.round(Math.log2(blockSize));
	return {
		blockSize,
		blockLog,
		compression: buf.readUInt16LE(20),
		flags: buf.readUInt16LE(24),
		inodeCount: buf.readUInt32LE(4),
		modTime: buf.readUInt32LE(8),
		rootInode: buf.readBigUInt64LE(32),
		idCount: buf.readUInt16LE(26),
		idTableStart: Number(buf.readBigUInt64LE(48)),
		inodeTableStart: Number(buf.readBigUInt64LE(64)),
		directoryTableStart: Number(buf.readBigUInt64LE(72)),
		fragmentTableStart: Number(buf.readBigUInt64LE(80)),
	};
}

function isCompressed(hdr: number): boolean {
	return !(hdr & COMPRESSED_BIT);
}

function getBlockSize(hdr: number): number {
	const size = hdr & ~COMPRESSED_BIT;
	return size === 0 ? COMPRESSED_BIT : size;
}

function readMetadataBlocks(
	buf: Buffer,
	startOffset: number,
	endOffset?: number
): { data: Buffer; blocks: MetadataBlockEntry[] } {
	const parts: Buffer[] = [];
	const blocks: MetadataBlockEntry[] = [];
	let offset = startOffset;
	const limit = endOffset ?? buf.length;
	while (offset + 2 <= limit) {
		const hdr = buf.readUInt16LE(offset);
		const compressed = isCompressed(hdr);
		let blockSize = getBlockSize(hdr);

		if (blockSize === 0) {
			break;
		}

		if (offset + 2 + blockSize > limit) {
			blockSize = limit - offset - 2;
			if (blockSize <= 0) {
				break;
			}
		}

		blocks.push({ fileOffset: offset, blockSize, compressed });

		const raw = buf.slice(offset + 2, offset + 2 + blockSize);
		if (compressed) {
			try {
				parts.push(Buffer.from(unzlibSync(raw)));
			} catch {
				parts.push(raw);
			}
		} else {
			parts.push(raw);
		}
		offset += 2 + blockSize;
	}
	return { data: Buffer.concat(parts), blocks };
}

function findRootInodePosition(
	blocks: MetadataBlockEntry[],
	rootInode: bigint,
	inodeTableStart: number
): number {
	const targetFileOffset = inodeTableStart + (Number(rootInode) >> 16);
	const offsetInBlock = Number(rootInode) & 0xffff;

	let decompressedOffset = 0;
	for (const block of blocks) {
		if (block.fileOffset === targetFileOffset) {
			return decompressedOffset + offsetInBlock;
		}
		decompressedOffset += block.compressed ? 8192 : block.blockSize;
	}
	return -1;
}

function readIdTable(
	buf: Buffer,
	startOffset: number,
	count: number
): number[] {
	const { data } = readMetadataBlocks(buf, startOffset);
	const ids: number[] = [];
	for (let i = 0; i < count && i * 4 + 4 <= data.length; i++) {
		ids.push(data.readUInt32LE(i * 4));
	}
	return ids;
}

function readFragmentTable(
	buf: Buffer,
	startOffset: number,
	fragmentCount: number
): FragmentEntry[] {
	const metaBlocks = Math.ceil((fragmentCount * 12) / 8192);

	const fragments: FragmentEntry[] = [];
	for (let i = 0; i < metaBlocks; i++) {
		const indexOffset = Number(buf.readBigUInt64LE(startOffset + i * 8));
		if (indexOffset === 0) {
			break;
		}
		const { data } = readBlock(buf, indexOffset);
		if (data.length === 0) {
			break;
		}
		fragments.push(...readFragmentEntriesFromBlock(data));
	}
	return fragments;
}

function readBlock(
	buf: Buffer,
	startOffset: number
): { data: Buffer; compressedSize: number; compressed: boolean } {
	const hdr = buf.readUInt16LE(startOffset);
	const compressed = !(hdr & COMPRESSED_BIT);
	let blockSize = hdr & ~COMPRESSED_BIT;
	if (blockSize === 0) {
		return { data: Buffer.alloc(0), compressedSize: 0, compressed: false };
	}
	if (startOffset + 2 + blockSize > buf.length) {
		blockSize = buf.length - startOffset - 2;
		if (blockSize <= 0) {
			return { data: Buffer.alloc(0), compressedSize: 0, compressed: false };
		}
	}
	const raw = buf.slice(startOffset + 2, startOffset + 2 + blockSize);
	let data: Buffer;
	if (compressed) {
		try {
			data = Buffer.from(unzlibSync(raw));
		} catch {
			data = raw;
		}
	} else {
		data = raw;
	}
	return { data, compressedSize: 2 + blockSize, compressed };
}

function readFragmentEntriesFromBlock(blockData: Buffer): FragmentEntry[] {
	const fragments: FragmentEntry[] = [];
	for (let off = 0; off + 12 <= blockData.length; off += 12) {
		const startBlock = Number(blockData.readBigUInt64LE(off));
		const size = blockData.readUInt32LE(off + 8);
		if (startBlock === 0 && size === 0) {
			break;
		}
		fragments.push({ startBlock, size });
	}
	return fragments;
}

function parseInode(buf: Buffer, offset: number): ParsedInode {
	const inodeType = buf.readUInt16LE(offset);
	const mode = buf.readUInt16LE(offset + 2);
	const uid = buf.readUInt16LE(offset + 4);
	const gid = buf.readUInt16LE(offset + 6);
	const mtime = buf.readUInt32LE(offset + 8);
	const inodeNumber = buf.readUInt32LE(offset + 12);

	const base: ParsedInode = { inodeType, mode, uid, gid, mtime, inodeNumber };

	switch (inodeType) {
		case INODE_DIR: {
			base.dirStartBlock = buf.readUInt32LE(offset + 16);
			base.dirSize = buf.readUInt16LE(offset + 24);
			base.dirOffset = buf.readUInt16LE(offset + 26);
			break;
		}
		case INODE_LDIR: {
			base.dirSize = buf.readUInt32LE(offset + 20);
			base.dirStartBlock = buf.readUInt32LE(offset + 24);
			base.dirOffset = buf.readUInt16LE(offset + 34);
			break;
		}
		case INODE_FILE: {
			const fileStartBlock = buf.readUInt32LE(offset + 16);
			const fragment = buf.readUInt32LE(offset + 20);
			const fragOffset = buf.readUInt32LE(offset + 24);
			const fileSize = buf.readUInt32LE(offset + 28);

			const hasFragment = fragment !== 0xffffffff;
			const actualBlockCount = hasFragment
				? Math.floor(fileSize / 4096)
				: Math.ceil(fileSize / 4096);

			const blockSizes: number[] = [];
			for (let i = 0; i < actualBlockCount; i++) {
				blockSizes.push(buf.readUInt32LE(offset + 32 + i * 4));
			}

			base.fileSize = fileSize;
			base.fileStartBlock = fileStartBlock;
			base.fragmentIndex = fragment;
			base.fragmentOffset = fragOffset;
			base.blockSizes = blockSizes;
			break;
		}
		case INODE_LFILE: {
			const fileStartBlock = Number(buf.readBigUInt64LE(offset + 16));
			const fileSize = Number(buf.readBigUInt64LE(offset + 24));
			const fragment = buf.readUInt32LE(offset + 44);
			const fragOffset = buf.readUInt32LE(offset + 48);

			const hasFragment = fragment !== 0xffffffff;
			const actualBlockCount = hasFragment
				? Math.floor(fileSize / 4096)
				: Math.ceil(fileSize / 4096);

			const blockSizes: number[] = [];
			for (let i = 0; i < actualBlockCount; i++) {
				blockSizes.push(buf.readUInt32LE(offset + 56 + i * 4));
			}

			base.fileSize = fileSize;
			base.fileStartBlock = fileStartBlock;
			base.fragmentIndex = fragment;
			base.fragmentOffset = fragOffset;
			base.blockSizes = blockSizes;
			break;
		}
		case INODE_SYMLINK:
		case INODE_LSYMLINK: {
			const symSize = buf.readUInt32LE(offset + 20);
			base.symlinkTarget = buf
				.slice(offset + 24, offset + 24 + symSize)
				.toString("utf8");
			break;
		}
		case INODE_BLKDEV:
		case INODE_CHRDEV: {
			break;
		}
		case INODE_FIFO:
		case INODE_SOCKET: {
			break;
		}
		default: {
			break;
		}
	}

	return base;
}

function inodeHeaderSize(inodeType: number): number {
	switch (inodeType) {
		case INODE_DIR:
			return 32;
		case INODE_LDIR:
			return 40;
		case INODE_FILE:
			return 32;
		case INODE_LFILE:
			return 56;
		case INODE_SYMLINK:
		case INODE_LSYMLINK:
			return 24;
		case INODE_BLKDEV:
		case INODE_CHRDEV:
			return 28;
		case INODE_FIFO:
		case INODE_SOCKET:
			return 24;
		default:
			return 32;
	}
}

function inodeTotalSize(buf: Buffer, offset: number): number {
	const t = buf.readUInt16LE(offset);
	const base = inodeHeaderSize(t);

	if (t === INODE_SYMLINK || t === INODE_LSYMLINK) {
		return base + buf.readUInt32LE(offset + 20);
	}

	if (t === INODE_FILE) {
		const fragment = buf.readUInt32LE(offset + 20);
		const fileSize = buf.readUInt32LE(offset + 28);
		const hasFragment = fragment !== 0xffffffff;
		const blocks = hasFragment
			? Math.floor(fileSize / 4096)
			: Math.ceil(fileSize / 4096);
		return base + blocks * 4;
	}

	if (t === INODE_LFILE) {
		const fileSize = Number(buf.readBigUInt64LE(offset + 24));
		const fragment = buf.readUInt32LE(offset + 44);
		const hasFragment = fragment !== 0xffffffff;
		const blocks = hasFragment
			? Math.floor(fileSize / 4096)
			: Math.ceil(fileSize / 4096);
		return base + blocks * 4;
	}

	return base;
}

function buildInodeMap(inodeData: Buffer): Map<number, ParsedInode> {
	const inodes = new Map<number, ParsedInode>();
	let offset = 0;
	while (offset + 16 <= inodeData.length) {
		const t = inodeData.readUInt16LE(offset);
		if (t === 0) {
			break;
		}
		const inode = parseInode(inodeData, offset);
		inodes.set(inode.inodeNumber, inode);
		offset += inodeTotalSize(inodeData, offset);
	}
	return inodes;
}

function readFileData(
	buf: Buffer,
	startBlock: number,
	blockSizes: number[]
): Buffer {
	const parts: Buffer[] = [];
	let offset = startBlock;
	for (const rawSize of blockSizes) {
		if (rawSize === 0) {
			continue;
		}
		const compressed = !(rawSize & COMPRESSED_BIT_BLOCK);
		const actualSize = rawSize & ~COMPRESSED_BIT_BLOCK;
		if (actualSize === 0) {
			continue;
		}

		let part: Buffer;
		if (compressed) {
			try {
				part = Buffer.from(unzlibSync(buf.slice(offset, offset + actualSize)));
			} catch {
				part = buf.slice(offset, offset + actualSize);
			}
		} else {
			part = buf.slice(offset, offset + actualSize);
		}
		parts.push(part);
		offset += actualSize;
	}
	return Buffer.concat(parts);
}

function parseDirEntries(
	dirTable: Buffer,
	start: number,
	size: number
): DirEntry[] {
	const entries: DirEntry[] = [];
	const end = start + size;
	let offset = start;

	while (offset + 12 <= dirTable.length && offset < end) {
		const count = dirTable.readUInt32LE(offset);
		const startBlock = dirTable.readUInt32LE(offset + 4);
		const inodeNumber = dirTable.readUInt32LE(offset + 8);

		if (count === 0 && startBlock === 0 && inodeNumber === 0) {
			offset += 12;
			continue;
		}

		offset += 12;

		const numEntries = count + 1;
		for (let i = 0; i < numEntries; i++) {
			if (offset + 8 > dirTable.length || offset >= end) {
				break;
			}

			const relInode = dirTable.readInt16LE(offset + 2);
			const entryType = dirTable.readUInt16LE(offset + 4);
			const nameLen = dirTable.readUInt16LE(offset + 6);

			offset += 8;
			const actualNameLen = nameLen + 1;
			const name = dirTable
				.slice(offset, offset + actualNameLen)
				.toString("utf8");
			offset += actualNameLen;

			entries.push({
				inodeNumber: inodeNumber + relInode,
				type: entryType,
				name,
			});
		}
	}

	return entries;
}

export function decodeSquashfs(buf: Buffer): InternalDirectoryNode {
	if (!isSquashfsFormat(buf)) {
		throw new Error("decodeSquashfs: not a squashfs image");
	}
	const sb = parseSuperblock(buf);
	if (sb.compression !== COMP_GZIP) {
		throw new Error(
			`decodeSquashfs: unsupported compression ${sb.compression} (only gzip=1)`
		);
	}

	const idTable = readIdTable(buf, sb.idTableStart, sb.idCount);
	const fragmentCount = buf.readUInt32LE(16);
	const fragments =
		sb.fragmentTableStart > 0 && fragmentCount > 0
			? readFragmentTable(buf, sb.fragmentTableStart, fragmentCount)
			: [];

	const { data: inodeData, blocks: inodeBlocks } = readMetadataBlocks(
		buf,
		sb.inodeTableStart,
		sb.directoryTableStart
	);

	const rootInodeOffset = findRootInodePosition(
		inodeBlocks,
		sb.rootInode,
		sb.inodeTableStart
	);
	if (rootInodeOffset < 0 || rootInodeOffset >= inodeData.length) {
		throw new Error(
			`decodeSquashfs: root inode not found at offset ${rootInodeOffset}`
		);
	}

	const rootParsed = parseInode(inodeData, rootInodeOffset);
	const inodes = buildInodeMap(inodeData);

	const { data: dirTable } = readMetadataBlocks(buf, sb.directoryTableStart);

	const root = makeDir(
		"",
		rootParsed.mode || 0o755,
		0,
		0,
		rootParsed.mtime * 1000
	);

	if (rootParsed.dirStartBlock !== undefined) {
		walkDir(
			buf,
			rootParsed,
			dirTable,
			inodes,
			idTable,
			fragments,
			root,
			"",
			sb
		);
	}

	return root;
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
		children: Object.create(null),
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

function computeDirTableOffset(
	dirTable: Buffer,
	dirInode: ParsedInode,
	dirTableStart: number
): number {
	const targetBlock = dirInode.dirStartBlock ?? 0;
	const offsetInBlock = dirInode.dirOffset ?? 0;
	const targetFileOffset = dirTableStart + targetBlock;

	let decompressedPos = 0;
	let filePos = dirTableStart;
	while (filePos < targetFileOffset && decompressedPos < dirTable.length) {
		const nextFilePos = filePos + 2;
		if (nextFilePos >= targetFileOffset) {
			break;
		}
		decompressedPos += 8192;
		filePos = nextFilePos;
	}

	return decompressedPos + offsetInBlock;
}

function walkDir(
	buf: Buffer,
	dirInode: ParsedInode,
	dirTable: Buffer,
	inodes: Map<number, ParsedInode>,
	idTable: number[],
	fragments: FragmentEntry[],
	parentDir: InternalDirectoryNode,
	prefix: string,
	sb: SquashfsSuperblock
): void {
	if (
		dirInode.dirStartBlock === undefined ||
		dirInode.dirOffset === undefined
	) {
		return;
	}

	const startPos = computeDirTableOffset(
		dirTable,
		dirInode,
		sb.directoryTableStart
	);
	const dirSize =
		dirInode.dirSize === undefined ? 0 : Math.max(0, dirInode.dirSize - 3);

	const entries = parseDirEntries(dirTable, startPos, dirSize);

	for (const entry of entries) {
		const inode = inodes.get(entry.inodeNumber);
		if (!inode) {
			continue;
		}

		const uid = inode.uid < idTable.length ? (idTable[inode.uid] ?? 0) : 0;
		const gid = inode.gid < idTable.length ? (idTable[inode.gid] ?? 0) : 0;
		const mtimeMs = inode.mtime * 1000;

		if (inode.inodeType === INODE_DIR || inode.inodeType === INODE_LDIR) {
			const dirNode = makeDir(
				entry.name,
				inode.mode === 0 ? 0o755 : inode.mode,
				uid,
				gid,
				mtimeMs
			);
			parentDir.children[entry.name] = dirNode;
			parentDir._childCount++;
			parentDir._sortedKeys = null;

			if (inode.dirStartBlock !== undefined && inode.dirOffset !== undefined) {
				walkDir(
					buf,
					inode,
					dirTable,
					inodes,
					idTable,
					fragments,
					dirNode,
					prefix ? `${prefix}/${entry.name}` : `/${entry.name}`,
					sb
				);
			}
		} else if (
			inode.inodeType === INODE_SYMLINK ||
			inode.inodeType === INODE_LSYMLINK
		) {
			const target = inode.symlinkTarget ?? "";
			parentDir.children[entry.name] = makeFile(
				entry.name,
				Buffer.from(target, "utf8"),
				0o120777,
				uid,
				gid,
				mtimeMs
			);
			parentDir._childCount++;
			parentDir._sortedKeys = null;
		} else if (
			inode.inodeType === INODE_FILE ||
			inode.inodeType === INODE_LFILE
		) {
			let content: Buffer = Buffer.alloc(0);
			const fileSize = inode.fileSize ?? 0;
			if (
				inode.blockSizes &&
				inode.blockSizes.length > 0 &&
				inode.fileStartBlock
			) {
				try {
					content = readFileData(buf, inode.fileStartBlock, inode.blockSizes);
				} catch {
					content = Buffer.alloc(0);
				}
			}
			if (
				content.length === 0 &&
				inode.fragmentIndex !== undefined &&
				inode.fragmentIndex !== 0xffffffff &&
				fileSize > 0
			) {
				try {
					const frag = fragments[inode.fragmentIndex];
					if (frag) {
						const compressed = !(frag.size & COMPRESSED_BIT_BLOCK);
						const actualSize = frag.size & ~COMPRESSED_BIT_BLOCK;
						const fragRaw = buf.slice(
							frag.startBlock,
							frag.startBlock + actualSize
						);
						let fragData: Buffer;
						if (compressed) {
							try {
								fragData = Buffer.from(unzlibSync(fragRaw));
							} catch {
								fragData = fragRaw;
							}
						} else {
							fragData = fragRaw;
						}
						const fragOff = inode.fragmentOffset ?? 0;
						content = fragData.slice(fragOff, fragOff + fileSize);
					}
				} catch {
					content = Buffer.alloc(0);
				}
			}
			parentDir.children[entry.name] = makeFile(
				entry.name,
				content,
				inode.mode || 0o644,
				uid,
				gid,
				mtimeMs
			);
			parentDir._childCount++;
			parentDir._sortedKeys = null;
		}
	}
}
