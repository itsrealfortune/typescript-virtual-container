/**
 * journal.ts — Write-Ahead Log for VirtualFileSystem "fs" mode.
 *
 * Each mutating VFS operation is appended to `vfs-journal.bin` immediately.
 * On `restoreMirror()` the base snapshot is loaded first, then the journal
 * is replayed on top. On `flushMirror()` a new checkpoint is written and
 * the journal is truncated.
 *
 * Entry format (binary, little-endian):
 *   [1B op] [2B path_len] [path bytes] [payload per op]
 *
 * Op codes:
 *   0x01 WRITE  — [4B content_len] [content bytes] [4B mode]
 *   0x02 MKDIR  — [4B mode]
 *   0x03 REMOVE — (no payload)
 *   0x04 CHMOD  — [4B mode]
 *   0x05 MOVE   — [2B dest_len] [dest bytes]
 *   0x06 SYMLINK — [2B target_len] [target bytes]
 */
/** biome-ignore-all lint/style/useNamingConvention: JournalOp modes */

import * as fsSync from "node:fs";

export const JournalOp = {
	WRITE:   0x01,
	MKDIR:   0x02,
	REMOVE:  0x03,
	CHMOD:   0x04,
	MOVE:    0x05,
	SYMLINK: 0x06,
} as const;

export type JournalOp = typeof JournalOp[keyof typeof JournalOp];

export interface JournalEntry {
	op:      JournalOp;
	path:    string;
	content?: Buffer;
	mode?:   number;
	dest?:   string;   // MOVE destination, SYMLINK target
}

const ENC = "utf8" as const;

function writeString2(buf: Buffer, offset: number, s: string): number {
	const b = Buffer.from(s, ENC);
	buf.writeUInt16LE(b.length, offset);
	b.copy(buf, offset + 2);
	return 2 + b.length;
}

/** Serialise one entry to a Buffer. */
export function encodeEntry(e: JournalEntry): Buffer {
	const pathBuf = Buffer.from(e.path, ENC);
	let payloadLen = 0;

	if (e.op === JournalOp.WRITE) {
		payloadLen = 4 + (e.content?.length ?? 0) + 4;
	} else if (e.op === JournalOp.MKDIR) {
		payloadLen = 4;
	} else if (e.op === JournalOp.REMOVE) {
		payloadLen = 0;
	} else if (e.op === JournalOp.CHMOD) {
		payloadLen = 4;
	} else if (e.op === JournalOp.MOVE || e.op === JournalOp.SYMLINK) {
		payloadLen = 2 + Buffer.byteLength(e.dest ?? "", ENC);
	}

	const total = 1 + 2 + pathBuf.length + payloadLen;
	const buf   = Buffer.allocUnsafe(total);
	let off = 0;

	buf.writeUInt8(e.op, off++);
	buf.writeUInt16LE(pathBuf.length, off); off += 2;
	pathBuf.copy(buf, off); off += pathBuf.length;

	if (e.op === JournalOp.WRITE) {
		const c = e.content ?? Buffer.alloc(0);
		buf.writeUInt32LE(c.length, off); off += 4;
		c.copy(buf, off); off += c.length;
		buf.writeUInt32LE(e.mode ?? 0o644, off); off += 4;
	} else if (e.op === JournalOp.MKDIR) {
		buf.writeUInt32LE(e.mode ?? 0o755, off); off += 4;
	} else if (e.op === JournalOp.CHMOD) {
		buf.writeUInt32LE(e.mode ?? 0o644, off); off += 4;
	} else if (e.op === JournalOp.MOVE || e.op === JournalOp.SYMLINK) {
		off += writeString2(buf, off, e.dest ?? "");
	}

	return buf;
}

/** Parse all entries from a journal Buffer. Returns empty array on corrupt data. */
export function decodeJournal(buf: Buffer): JournalEntry[] {
	const entries: JournalEntry[] = [];
	let off = 0;

	try {
		while (off < buf.length) {
			if (off + 3 > buf.length) break;
			const op      = buf.readUInt8(off++) as JournalOp;
			const pathLen = buf.readUInt16LE(off); off += 2;
			if (off + pathLen > buf.length) break;
			const path    = buf.subarray(off, off + pathLen).toString(ENC); off += pathLen;

			if (op === JournalOp.WRITE) {
				if (off + 4 > buf.length) break;
				const cLen = buf.readUInt32LE(off); off += 4;
				if (off + cLen + 4 > buf.length) break;
				const content = Buffer.from(buf.subarray(off, off + cLen)); off += cLen;
				const mode    = buf.readUInt32LE(off); off += 4;
				entries.push({ op, path, content, mode });
			} else if (op === JournalOp.MKDIR) {
				if (off + 4 > buf.length) break;
				const mode = buf.readUInt32LE(off); off += 4;
				entries.push({ op, path, mode });
			} else if (op === JournalOp.REMOVE) {
				entries.push({ op, path });
			} else if (op === JournalOp.CHMOD) {
				if (off + 4 > buf.length) break;
				const mode = buf.readUInt32LE(off); off += 4;
				entries.push({ op, path, mode });
			} else if (op === JournalOp.MOVE || op === JournalOp.SYMLINK) {
				if (off + 2 > buf.length) break;
				const dLen = buf.readUInt16LE(off); off += 2;
				if (off + dLen > buf.length) break;
				const dest = buf.subarray(off, off + dLen).toString(ENC); off += dLen;
				entries.push({ op, path, dest });
			} else {
				// Unknown op — skip rest of buffer to avoid corrupt replay
				break;
			}
		}
	} catch {
		// Truncated or corrupt entry — return what we have
	}

	return entries;
}

/** Append a single entry to the journal file (O_APPEND, atomic write). */
export function appendJournalEntry(journalPath: string, entry: JournalEntry): void {
	const buf = encodeEntry(entry);
	const fd  = fsSync.openSync(journalPath, fsSync.constants.O_WRONLY | fsSync.constants.O_CREAT | fsSync.constants.O_APPEND);
	try {
		fsSync.writeSync(fd, buf);
	} finally {
		fsSync.closeSync(fd);
	}
}

/** Read and decode all entries from a journal file. Returns [] if file is absent/empty. */
export function readJournal(journalPath: string): JournalEntry[] {
	if (!fsSync.existsSync(journalPath)) return [];
	const buf = fsSync.readFileSync(journalPath);
	if (buf.length === 0) return [];
	return decodeJournal(buf);
}

/** Delete the journal file (after a successful checkpoint). */
export function truncateJournal(journalPath: string): void {
	if (fsSync.existsSync(journalPath)) fsSync.unlinkSync(journalPath);
}
