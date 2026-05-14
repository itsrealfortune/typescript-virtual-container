import { gunzipSync, gzipSync } from "fflate";
import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

// ── POSIX ustar tar format ────────────────────────────────────────────────────

function makeTarHeader(name: string, size: number, isDir: boolean): Buffer {
	const hdr = Buffer.alloc(512);
	const enc = (s: string, off: number, len: number) => {
		const b = Buffer.from(s, "ascii");
		b.copy(hdr, off, 0, Math.min(b.length, len));
	};

	enc(isDir ? `${name}/` : name, 0, 100);
	enc(isDir ? "0000755\0" : "0000644\0", 100, 8);
	enc("0000000\0", 108, 8);
	enc("0000000\0", 116, 8);
	enc(size.toString(8).padStart(11, "0") + "\0", 124, 12);
	enc(Math.floor(Date.now() / 1000).toString(8).padStart(11, "0") + "\0", 136, 12);
	hdr[156] = isDir ? 0x35 : 0x30; // '5' dir, '0' file
	enc("ustar\0", 257, 6);
	enc("00", 263, 2);
	enc("root\0", 265, 32); // uname
	enc("root\0", 297, 32); // gname

	// Checksum: fill field with spaces, compute, write
	for (let i = 148; i < 156; i++) hdr[i] = 0x20;
	let sum = 0;
	for (let i = 0; i < 512; i++) sum += hdr[i]!;
	Buffer.from(`${sum.toString(8).padStart(6, "0")}\0 `).copy(hdr, 148);

	return hdr;
}

function tarPad(size: number): Buffer {
	const rem = size % 512;
	return rem === 0 ? Buffer.alloc(0) : Buffer.alloc(512 - rem);
}

function buildTar(entries: Array<{ name: string; content: Buffer; isDir: boolean }>): Buffer {
	const parts: Buffer[] = [];
	for (const { name, content, isDir } of entries) {
		parts.push(makeTarHeader(name, isDir ? 0 : content.length, isDir));
		if (!isDir) {
			parts.push(content);
			parts.push(tarPad(content.length));
		}
	}
	parts.push(Buffer.alloc(1024)); // end-of-archive
	return Buffer.concat(parts);
}

function parseTar(raw: Buffer): Array<{ name: string; content: Buffer }> {
	const files: Array<{ name: string; content: Buffer }> = [];
	let off = 0;
	while (off + 512 <= raw.length) {
		const hdr = raw.slice(off, off + 512);
		if (hdr.every((b) => b === 0)) break;
		const name = hdr.slice(0, 100).toString("ascii").replace(/\0.*/, "");
		const sizeStr = hdr.slice(124, 135).toString("ascii").replace(/\0.*/, "").trim();
		const size = parseInt(sizeStr, 8) || 0;
		const typeflag = hdr[156];
		off += 512;
		if (name && typeflag !== 0x35 && typeflag !== 53) { // not a directory
			const content = raw.slice(off, off + size);
			files.push({ name, content });
		}
		off += Math.ceil(size / 512) * 512;
	}
	return files;
}

/**
 * Archive or extract files with tar — writes real POSIX ustar binary format.
 * Supports -c/-x/-t, -z (gzip), -j (bzip2 stub), -v (verbose), -f.
 * @category archive
 * @params ["[-czf|-xzf|-tf] <archive> [files...]"]
 */
export const tarCommand: ShellModule = {
	name: "tar",
	description: "Archive utility",
	category: "archive",
	params: ["[-czf|-xzf|-tf] <archive> [files...]"],
	run: ({ authUser, shell, cwd, args }) => {
		// Expand combined flags: -czf → ["-c", "-z", "-f"]
		const expanded: string[] = [];
		let foundModeStr = false;
		for (const a of args) {
			if (/^-[a-zA-Z]{2,}$/.test(a)) {
				for (const ch of a.slice(1)) expanded.push(`-${ch}`);
			} else if (!foundModeStr && /^[cxtdru][a-zA-Z]*$/.test(a) && !a.includes("/") && !a.startsWith("-")) {
				foundModeStr = true;
				for (const ch of a) expanded.push(`-${ch}`);
			} else {
				expanded.push(a);
			}
		}

		const create  = expanded.includes("-c");
		const extract = expanded.includes("-x");
		const list    = expanded.includes("-t");
		const useGzip = expanded.includes("-z");
		const verbose = expanded.includes("-v");
		const fIdx = expanded.indexOf("-f");
		const archiveName = fIdx !== -1
			? expanded[fIdx + 1]
			: expanded.find((a) => a.endsWith(".tar") || a.endsWith(".tar.gz") || a.endsWith(".tgz") || a.endsWith(".tar.bz2"));

		if (!create && !extract && !list) return { stderr: "tar: must specify -c, -x, or -t", exitCode: 1 };
		if (!archiveName) return { stderr: "tar: no archive specified", exitCode: 1 };

		const archivePath = resolvePath(cwd, archiveName);
		const autoGzip = useGzip || archiveName.endsWith(".gz") || archiveName.endsWith(".tgz");

		if (create) {
			const skipSet = new Set<string>();
			if (fIdx !== -1 && expanded[fIdx + 1]) skipSet.add(expanded[fIdx + 1]!);
			const fileArgs = expanded.filter((a) => !a.startsWith("-") && !skipSet.has(a));

			const entries: Array<{ name: string; content: Buffer; isDir: boolean }> = [];
			const verboseLines: string[] = [];

			for (const f of fileArgs) {
				const p = resolvePath(cwd, f);
				if (!shell.vfs.exists(p)) return { stderr: `tar: ${f}: No such file or directory`, exitCode: 1 };
				const st = shell.vfs.stat(p);
				if (st.type === "file") {
					const content = shell.vfs.readFileRaw(p);
					entries.push({ name: f, content, isDir: false });
					if (verbose) verboseLines.push(f);
				} else {
					entries.push({ name: f, content: Buffer.alloc(0), isDir: true });
					if (verbose) verboseLines.push(`${f}/`);
					const walk = (dir: string, prefix: string) => {
						for (const e of shell.vfs.list(dir)) {
							const full = `${dir}/${e}`, rel = `${prefix}/${e}`;
							const s = shell.vfs.stat(full);
							if (s.type === "directory") {
								entries.push({ name: rel, content: Buffer.alloc(0), isDir: true });
								if (verbose) verboseLines.push(`${rel}/`);
								walk(full, rel);
							} else {
								const content = shell.vfs.readFileRaw(full);
								entries.push({ name: rel, content, isDir: false });
								if (verbose) verboseLines.push(rel);
							}
						}
					};
					walk(p, f);
				}
			}

			const tarBuf = buildTar(entries);
			const finalBuf = autoGzip ? Buffer.from(gzipSync(tarBuf)) : tarBuf;
			shell.vfs.writeFile(archivePath, finalBuf);
			return { stdout: verbose ? verboseLines.join("\n") : undefined, exitCode: 0 };
		}

		if (list || extract) {
			const rawArchive = shell.vfs.readFileRaw(archivePath);
			let raw: Buffer;
			if (autoGzip) {
				try { raw = Buffer.from(gunzipSync(rawArchive)); }
				catch { return { stderr: `tar: ${archiveName}: not a gzip file`, exitCode: 1 }; }
			} else {
				raw = rawArchive;
			}

			const files = parseTar(raw);
			if (list) {
				const names = files.map((f) => (verbose ? `-rw-r--r-- 0/0 ${f.content.length.toString().padStart(8)} 1970-01-01 00:00 ${f.name}` : f.name));
				return { stdout: names.join("\n"), exitCode: 0 };
			}

			const verboseLines: string[] = [];
			for (const { name, content } of files) {
				const destPath = resolvePath(cwd, name);
				shell.writeFileAsUser(authUser, destPath, content);
				if (verbose) verboseLines.push(name);
			}
			return { stdout: verbose ? verboseLines.join("\n") : undefined, exitCode: 0 };
		}

		return { stderr: "tar: must specify -c, -x, or -t", exitCode: 1 };
	},
};
