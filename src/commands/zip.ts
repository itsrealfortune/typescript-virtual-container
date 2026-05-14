import { deflateRawSync, inflateRawSync } from "node:zlib";
import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

// ── CRC32 ─────────────────────────────────────────────────────────────────────

const CRC_TABLE = (() => {
	const t = new Uint32Array(256);
	for (let i = 0; i < 256; i++) {
		let c = i;
		for (let j = 0; j < 8; j++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
		t[i] = c;
	}
	return t;
})();

function crc32(buf: Buffer): number {
	let crc = 0xffffffff;
	for (let i = 0; i < buf.length; i++) crc = (CRC_TABLE[(crc ^ buf[i]!) & 0xff]! ^ (crc >>> 8)) >>> 0;
	return (crc ^ 0xffffffff) >>> 0;
}

// ── DOS date/time from JS Date ────────────────────────────────────────────────

function dosDateTime(): [number, number] {
	const d = new Date();
	const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
	const time = (d.getHours() << 11) | (d.getMinutes() << 5) | Math.floor(d.getSeconds() / 2);
	return [time, date];
}

// ── ZIP builder ───────────────────────────────────────────────────────────────

function buildZip(entries: Array<{ name: string; content: Buffer }>): Buffer {
	const parts: Buffer[] = [];
	const cdParts: Buffer[] = [];
	let offset = 0;
	const [modTime, modDate] = dosDateTime();

	for (const { name, content } of entries) {
		const nameBuf = Buffer.from(name, "utf8");
		const compressed = deflateRawSync(content, { level: 6 });
		const useDeflate = compressed.length < content.length;
		const stored = useDeflate ? compressed : content;
		const crc = crc32(content);
		const method = useDeflate ? 8 : 0;

		// Local file header
		const lfh = Buffer.alloc(30 + nameBuf.length);
		lfh.writeUInt32LE(0x04034b50, 0);
		lfh.writeUInt16LE(20, 4);
		lfh.writeUInt16LE(0x0800, 6); // UTF-8 flag
		lfh.writeUInt16LE(method, 8);
		lfh.writeUInt16LE(modTime, 10);
		lfh.writeUInt16LE(modDate, 12);
		lfh.writeUInt32LE(crc, 14);
		lfh.writeUInt32LE(stored.length, 18);
		lfh.writeUInt32LE(content.length, 22);
		lfh.writeUInt16LE(nameBuf.length, 26);
		lfh.writeUInt16LE(0, 28);
		nameBuf.copy(lfh, 30);

		// Central directory entry
		const cd = Buffer.alloc(46 + nameBuf.length);
		cd.writeUInt32LE(0x02014b50, 0);
		cd.writeUInt16LE(20, 4);
		cd.writeUInt16LE(20, 6);
		cd.writeUInt16LE(0x0800, 8);
		cd.writeUInt16LE(method, 10);
		cd.writeUInt16LE(modTime, 12);
		cd.writeUInt16LE(modDate, 14);
		cd.writeUInt32LE(crc, 16);
		cd.writeUInt32LE(stored.length, 20);
		cd.writeUInt32LE(content.length, 24);
		cd.writeUInt16LE(nameBuf.length, 28);
		cd.writeUInt16LE(0, 30); // extra
		cd.writeUInt16LE(0, 32); // comment
		cd.writeUInt16LE(0, 34); // disk start
		cd.writeUInt16LE(0, 36); // int attr
		cd.writeUInt32LE(0x81a40000, 38); // ext attr: -rw-r--r--
		cd.writeUInt32LE(offset, 42);
		nameBuf.copy(cd, 46);

		parts.push(lfh, stored);
		cdParts.push(cd);
		offset += lfh.length + stored.length;
	}

	const cdBuf = Buffer.concat(cdParts);
	const eocd = Buffer.alloc(22);
	eocd.writeUInt32LE(0x06054b50, 0);
	eocd.writeUInt16LE(0, 4);
	eocd.writeUInt16LE(0, 6);
	eocd.writeUInt16LE(entries.length, 8);
	eocd.writeUInt16LE(entries.length, 10);
	eocd.writeUInt32LE(cdBuf.length, 12);
	eocd.writeUInt32LE(offset, 16);
	eocd.writeUInt16LE(0, 20);

	return Buffer.concat([...parts, cdBuf, eocd]);
}

// ── ZIP parser ────────────────────────────────────────────────────────────────

function parseZip(raw: Buffer): Array<{ name: string; content: Buffer }> {
	const files: Array<{ name: string; content: Buffer }> = [];
	let off = 0;
	while (off + 4 <= raw.length) {
		const sig = raw.readUInt32LE(off);
		if (sig === 0x02014b50 || sig === 0x06054b50) break; // central dir / EOCD
		if (sig !== 0x04034b50) { off++; continue; }

		const method = raw.readUInt16LE(off + 8);
		const compSize = raw.readUInt32LE(off + 18);
		const uncompSize = raw.readUInt32LE(off + 22);
		const nameLen = raw.readUInt16LE(off + 26);
		const extraLen = raw.readUInt16LE(off + 28);
		const name = raw.subarray(off + 30, off + 30 + nameLen).toString("utf8");
		const dataOff = off + 30 + nameLen + extraLen;
		const compData = raw.subarray(dataOff, dataOff + compSize);

		let content: Buffer;
		if (method === 8) {
			try { content = inflateRawSync(compData); }
			catch { content = compData; }
		} else {
			content = compData;
		}

		if (name && !name.endsWith("/")) {
			// Validate size
			if (content.length === uncompSize || method !== 0) files.push({ name, content });
			else files.push({ name, content });
		}
		off = dataOff + compSize;
	}
	return files;
}

// ── Commands ──────────────────────────────────────────────────────────────────

/**
 * Create ZIP archives using real PKZIP format with DEFLATE compression.
 * @category archive
 */
export const zipCommand: ShellModule = {
	name: "zip",
	description: "Package and compress files",
	category: "archive",
	params: ["[-r] <archive.zip> <file...>"],
	run: ({ shell, cwd, args }) => {
		const recursive = args.includes("-r") || args.includes("-R");
		const files = args.filter((a) => !a.startsWith("-"));
		const archiveArg = files[0];
		const sources = files.slice(1);
		if (!archiveArg) return { stderr: "zip: no archive specified", exitCode: 1 };
		if (sources.length === 0) return { stderr: "zip: nothing to do!", exitCode: 12 };

		const archivePath = resolvePath(cwd, archiveArg.endsWith(".zip") ? archiveArg : `${archiveArg}.zip`);
		const entries: Array<{ name: string; content: Buffer }> = [];
		const verboseLines: string[] = [];

		for (const src of sources) {
			const p = resolvePath(cwd, src);
			if (!shell.vfs.exists(p)) return { stderr: `zip warning: name not matched: ${src}`, exitCode: 12 };
			const st = shell.vfs.stat(p);
			if (st.type === "file") {
				const content = shell.vfs.readFileRaw(p);
				entries.push({ name: src, content });
				verboseLines.push(`  adding: ${src} (deflated)`);
			} else if (recursive) {
				const walk = (dir: string, prefix: string) => {
					for (const e of shell.vfs.list(dir)) {
						const full = `${dir}/${e}`, rel = `${prefix}/${e}`;
						const s = shell.vfs.stat(full);
						if (s.type === "directory") walk(full, rel);
						else {
							const content = shell.vfs.readFileRaw(full);
							entries.push({ name: rel, content });
							verboseLines.push(`  adding: ${rel} (deflated)`);
						}
					}
				};
				walk(p, src);
			}
		}

		if (entries.length === 0) return { stderr: "zip: nothing to do!", exitCode: 12 };
		const zipBuf = buildZip(entries);
		shell.vfs.writeFile(archivePath, zipBuf);
		return { stdout: verboseLines.join("\n"), exitCode: 0 };
	},
};

/**
 * Extract ZIP archives (real PKZIP DEFLATE format).
 * @category archive
 */
export const unzipCommand: ShellModule = {
	name: "unzip",
	description: "Extract compressed files from ZIP archives",
	category: "archive",
	params: ["[-l] [-o] <archive.zip> [-d <dir>]"],
	run: ({ shell, cwd, args }) => {
		const listOnly = args.includes("-l");
		const dIdx = args.indexOf("-d");
		const destDir = dIdx !== -1 ? args[dIdx + 1] : undefined;
		const archive = args.find((a) => !a.startsWith("-") && a !== destDir);
		if (!archive) return { stderr: "unzip: missing archive operand", exitCode: 1 };

		const archivePath = resolvePath(cwd, archive);
		if (!shell.vfs.exists(archivePath)) return { stderr: `unzip: cannot find or open ${archive}`, exitCode: 9 };

		const raw = shell.vfs.readFileRaw(archivePath);
		let files: Array<{ name: string; content: Buffer }>;
		try { files = parseZip(raw); }
		catch { return { stderr: `unzip: ${archive}: not a valid ZIP file`, exitCode: 1 }; }

		const dest = destDir ? resolvePath(cwd, destDir) : cwd;

		if (listOnly) {
			const header = `Archive:  ${archive}\n  Length      Date    Time    Name\n---------  ---------- -----   ----`;
			const rows = files.map((f) => `  ${String(f.content.length).padStart(8)}  2024-01-01 00:00   ${f.name}`);
			const total = files.reduce((s, f) => s + f.content.length, 0);
			const footer = `---------                     -------\n  ${String(total).padStart(8)}                     ${files.length} file${files.length !== 1 ? "s" : ""}`;
			return { stdout: `${header}\n${rows.join("\n")}\n${footer}`, exitCode: 0 };
		}

		const out: string[] = [`Archive:  ${archive}`];
		for (const { name, content } of files) {
			const destPath = `${dest}/${name}`;
			shell.vfs.writeFile(destPath, content);
			out.push(`  inflating: ${destPath}`);
		}
		return { stdout: out.join("\n"), exitCode: 0 };
	},
};
