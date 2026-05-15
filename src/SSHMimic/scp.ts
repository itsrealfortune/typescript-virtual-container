/**
 * SCP (Secure Copy Protocol) server-side implementation over SSH exec.
 *
 * Supports:
 *   scp -t [-r] <dest>   — sink mode  (client → server, uploading)
 *   scp -f [-r] <src>    — source mode (server → client, downloading)
 *
 * The SCP wire protocol is a line-oriented binary protocol sent over the
 * SSH exec channel. Control messages are ASCII lines terminated with \n.
 * File data immediately follows the ready acknowledgement (\0).
 *
 * Sink control messages (client → server):
 *   C<mode> <size> <name>\n   — regular file
 *   D<mode> 0 <name>\n        — enter directory
 *   E\n                        — leave directory
 *   T<mtime_s> 0 <atime_s> 0\n — timestamps (ignored)
 *
 * Acknowledgement byte: \0 = ok, \1 = warning, \2 = error.
 */

import { basename } from "node:path";
import { resolvePath } from "../modules/shellRuntime";
import type { VirtualShell } from "../VirtualShell";

// ── Stream type ───────────────────────────────────────────────────────────────
// ssh2 ServerChannel is a Duplex; we need both read and write + exit/stderr.

interface ScpStream {
	write(data: Buffer | string): boolean;
	on(event: "data", listener: (chunk: Buffer) => void): this;
	on(event: "end" | "close", listener: () => void): this;
	stderr: { write(data: string | Buffer): void };
	exit(code: number): void;
	end(): void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const ACK = Buffer.from([0x00]);
const ERR = (msg: string): Buffer => Buffer.from(`\x02${msg}\n`);

function scpError(stream: ScpStream, msg: string, code = 1): void {
	stream.stderr.write(`scp: ${msg}\n`);
	stream.write(ERR(`scp: ${msg}`));
	stream.exit(code);
	stream.end();
}

function parseArgs(args: string[]): {
	sink: boolean;
	source: boolean;
	recursive: boolean;
	preserve: boolean;
	target: string | undefined;
} {
	const flags = args.filter((a) => a.startsWith("-")).join("");
	return {
		sink: flags.includes("t"),
		source: flags.includes("f"),
		recursive: flags.includes("r"),
		preserve: flags.includes("p"),
		target: args.find((a) => !a.startsWith("-")),
	};
}

// ── Sink mode (upload: client → server) ──────────────────────────────────────

export function runScpSink(
	stream: ScpStream,
	destArg: string,
	authUser: string,
	shell: VirtualShell,
	recursive: boolean,
): void {
	// Buffered reader that handles arbitrary chunk boundaries
	let buf = Buffer.alloc(0);
	const dirStack: string[] = [resolvePath("/", destArg)];
	let state: "cmd" | "data" = "cmd";
	let pendingFile: { name: string; size: number; dest: string } | null = null;
	let bytesRead = 0;
	const fileChunks: Buffer[] = [];
	let finished = false;

	function currentDir(): string {
		return dirStack.at(-1) ?? "/";
	}

	function send(data: Buffer | string): void {
		stream.write(typeof data === "string" ? Buffer.from(data) : data);
	}

	function processCmd(line: string): void {
		const type = line[0];

		// Timestamps — ignored, just ack
		if (type === "T") {
			send(ACK);
			return;
		}

		// End directory
		if (type === "E") {
			dirStack.pop();
			send(ACK);
			return;
		}

		// File or directory header: C<mode> <size> <name>  /  D<mode> 0 <name>
		if (type === "C" || type === "D") {
			const parts = line.slice(1).split(" ");
			const name = parts.slice(2).join(" "); // name may contain spaces
			const size = Number(parts[1] ?? "0");

			if (!name || name === "." || name === "..") {
				send(ERR("invalid filename"));
				return;
			}

			if (type === "D") {
				if (!recursive) {
					send(ERR("not a regular file"));
					return;
				}
				const dir = `${currentDir()}/${name}`;
				if (!shell.vfs.exists(dir)) {
					try { shell.vfs.mkdir(dir, 0o755); } catch { /* already exists */ }
				}
				dirStack.push(dir);
				send(ACK);
				return;
			}

			// type === "C"
			const destPath = `${currentDir()}/${name}`;
			pendingFile = { name, size, dest: destPath };
			bytesRead = 0;
			fileChunks.length = 0;
			state = "data";
			send(ACK);
			return;
		}

		send(ERR(`unknown control message: ${line[0]}`));
	}

	function processBuffer(): void {
		while (buf.length > 0) {
			if (state === "cmd") {
				const nl = buf.indexOf(0x0a); // \n
				if (nl === -1) break; // wait for more
				const line = buf.subarray(0, nl).toString("utf8").replace(/\r$/, "");
				buf = buf.subarray(nl + 1);
				processCmd(line);
			} else if (state === "data" && pendingFile) {
				const remaining = pendingFile.size - bytesRead;
				if (remaining > 0) {
					const take = Math.min(buf.length, remaining);
					fileChunks.push(buf.subarray(0, take));
					buf = buf.subarray(take);
					bytesRead += take;
				}
				if (bytesRead >= pendingFile.size) {
					// Next byte must be \0 (end-of-file marker from client)
					if (buf.length === 0) break;
					const marker = buf[0];
					buf = buf.subarray(1);
					if (marker !== 0x00) {
						scpError(stream, "protocol error: expected \\0 after file data");
						finished = true;
						return;
					}
					// Write file to VFS
					const content = Buffer.concat(fileChunks);
					try {
						shell.writeFileAsUser(authUser, pendingFile.dest, content);
					} catch (e) {
						send(ERR(`cannot write ${pendingFile.dest}: ${String(e)}`));
						finished = true;
						return;
					}
					pendingFile = null;
					state = "cmd";
					send(ACK);
				}
			} else {
				break;
			}
		}
	}

	// Send initial ready signal
	send(ACK);

	stream.on("data", (chunk: Buffer) => {
		if (finished) return;
		buf = Buffer.concat([buf, chunk]);
		processBuffer();
	});

	stream.on("end", () => {
		stream.exit(0);
		stream.end();
	});
}

// ── Source mode (download: server → client) ───────────────────────────────────

export function runScpSource(
	stream: ScpStream,
	srcArg: string,
	_authUser: string,
	shell: VirtualShell,
	recursive: boolean,
): void {
	const srcPath = resolvePath("/", srcArg);

	if (!shell.vfs.exists(srcPath)) {
		scpError(stream, `${srcArg}: No such file or directory`);
		return;
	}

	// Collect all entries to send
	type Entry =
		| { kind: "file"; path: string; name: string }
		| { kind: "dir-open"; name: string }
		| { kind: "dir-close" };

	const entries: Entry[] = [];

	function collect(p: string, name: string): void {
		const st = shell.vfs.stat(p);
		if (st.type === "directory") {
			if (!recursive) {
				// skip directories silently like real scp
				return;
			}
			entries.push({ kind: "dir-open", name });
			for (const child of shell.vfs.list(p)) {
				collect(`${p}/${child}`, child);
			}
			entries.push({ kind: "dir-close" });
		} else {
			entries.push({ kind: "file", path: p, name });
		}
	}

	collect(srcPath, basename(srcPath));

	if (entries.length === 0) {
		stream.exit(0);
		stream.end();
		return;
	}

	// State machine driven by \0 acks from client
	let idx = 0;
	let sendingData = false;
	let pendingData: Buffer | null = null;

	function sendNext(): void {
		if (idx >= entries.length) {
			stream.exit(0);
			stream.end();
			return;
		}

		const entry = entries[idx]!;
		idx++;

		if (entry.kind === "dir-open") {
			stream.write(`D0755 0 ${entry.name}\n`);
			// wait for ack, then recurse
		} else if (entry.kind === "dir-close") {
			stream.write("E\n");
			// wait for ack
		} else {
			const content = shell.vfs.readFileRaw(entry.path);
			stream.write(`C0644 ${content.length} ${entry.name}\n`);
			pendingData = content;
			sendingData = true;
		}
	}

	let buf = Buffer.alloc(0);
	let waitingForDataAck = false;

	function processAcks(): void {
		while (buf.length > 0) {
			const byte = buf[0]!;
			buf = buf.subarray(1);

			if (byte === 0x01 || byte === 0x02) {
				// Error from client
				stream.exit(1);
				stream.end();
				return;
			}

			// byte === 0x00: ack
			if (waitingForDataAck) {
				waitingForDataAck = false;
				sendNext();
				return;
			}

			if (sendingData && pendingData !== null) {
				// Client acked the header — send data then \0
				stream.write(pendingData);
				stream.write(ACK);
				pendingData = null;
				sendingData = false;
				waitingForDataAck = true;
			} else {
				sendNext();
			}
		}
	}

	stream.on("data", (chunk: Buffer) => {
		buf = Buffer.concat([buf, chunk]);
		processAcks();
	});

	stream.on("end", () => {
		stream.exit(0);
		stream.end();
	});

	// Wait for initial \0 from client before sending anything
	// (processAcks will call sendNext on first ack)
}

// ── Entry point ───────────────────────────────────────────────────────────────

export function handleScp(
	stream: ScpStream,
	rawArgs: string[],
	authUser: string,
	shell: VirtualShell,
): void {
	const { sink, source, recursive, target } = parseArgs(rawArgs);

	if (!sink && !source) {
		scpError(stream, "missing -t or -f flag");
		return;
	}
	if (!target) {
		scpError(stream, "missing target path");
		return;
	}

	if (sink) {
		runScpSink(stream, target, authUser, shell, recursive);
	} else {
		runScpSource(stream, target, authUser, shell, recursive);
	}
}
