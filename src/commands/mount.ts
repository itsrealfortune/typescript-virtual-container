import * as path from "node:path";
import * as fs from "node:fs";
import type { ShellModule } from "../types/commands";
import { ifFlag, parseArgs } from "./command-helpers";
import { decodeSquashfs } from "../modules/VirtualFileSystem/squashfs";
import type {
	InternalDirectoryNode,
	InternalNode,
} from "../modules/VirtualFileSystem/internalTypes";

function mountSquashfs(
	vfs: { mkdir(p: string, mode?: number): void; writeFile(p: string, content: Buffer, opts?: { mode?: number }): void },
	target: string,
	decoded: InternalDirectoryNode,
): void {
	vfs.mkdir(target, decoded.mode);
	_mountTree(vfs, target, decoded);
}

function _mountTree(
	vfs: { mkdir(p: string, mode?: number): void; writeFile(p: string, content: Buffer, opts?: { mode?: number }): void },
	base: string,
	dir: InternalDirectoryNode,
): void {
	for (const [name, child] of Object.entries(dir.children)) {
		const childPath = path.posix.join(base, name);
		if (child.type === "directory") {
			vfs.mkdir(childPath, child.mode);
			_mountTree(vfs, childPath, child);
		} else if (child.type === "file" || child.type === "stub") {
			const f = child as InternalNode & { content?: Buffer; stubContent?: string };
			const content = f.type === "stub" && f.stubContent
				? Buffer.from(f.stubContent, "utf8")
				: (f as { content: Buffer }).content ?? Buffer.alloc(0);
			vfs.writeFile(childPath, content, { mode: child.mode });
		}
	}
}

export const mountCommand: ShellModule = {
	name: "mount",
	description: "Mount a filesystem or list active mounts",
	category: "system",
	params: ["[-o <options>] [-t <fstype>] [source] [target]"],
	run: ({ shell, cwd, args }) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: mount [options] [source] [target]",
					"  -o, --options <opts>   Mount options (ro, rw, remount)",
					"  -t, --type <fstype>    Filesystem type (host, squashfs)",
					"  -h, --help             Show this help",
					"",
					"Without arguments, list active mounts.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-o", "--options", "-t", "--type"],
		});

		if (positionals.length === 0) {
			const mounts = shell.vfs.getMounts();
			if (mounts.length === 0) {
				return { stdout: "", exitCode: 0 };
			}
			const lines = mounts.map((m) => {
				const opts = m.readOnly ? "ro" : "rw";
				return `${m.hostPath} on ${m.vPath} type host (${opts})`;
			});
			return { stdout: `${lines.join("\n")}\n`, exitCode: 0 };
		}

		const options =
			flagsWithValues.get("-o") ?? flagsWithValues.get("--options") ?? "";
		const isReadOnly = options.includes("ro") && !options.includes("rw");
		const isRemount = options.includes("remount");
		const fstype =
			flagsWithValues.get("-t") ?? flagsWithValues.get("--type") ?? "";

		if (positionals.length >= 2) {
			const source = resolvePathOrAbsolute(cwd, positionals[0]!);
			const target = resolvePathOrAbsolute(cwd, positionals[1]!);

			if (fstype === "squashfs" || fstype === "squash4") {
				try {
					const raw = fs.readFileSync(source);
					const decoded = decodeSquashfs(raw);
					mountSquashfs(shell.vfs, target, decoded);
					return { exitCode: 0 };
				} catch (err: unknown) {
					const msg = err instanceof Error ? err.message : String(err);
					return { stderr: `mount: ${msg}`, exitCode: 32 };
				}
			}

			if (isRemount) {
				const mounts = shell.vfs.getMounts();
				const existing = mounts.find((m) => m.vPath === target);
				if (!existing) {
					return {
						stderr: `mount: ${target}: not mounted`,
						exitCode: 32,
					};
				}
				shell.vfs.unmount(target);
				shell.vfs.mount(target, existing.hostPath, {
					readOnly: isReadOnly,
				});
				return { exitCode: 0 };
			}

			try {
				shell.vfs.mount(target, source, { readOnly: isReadOnly });
				return { exitCode: 0 };
			} catch (err: unknown) {
				const msg = err instanceof Error ? err.message : String(err);
				return { stderr: `mount: ${msg}`, exitCode: 32 };
			}
		}

		if (positionals.length === 1) {
			const target = resolvePathOrAbsolute(cwd, positionals[0]!);
			const mounts = shell.vfs.getMounts();
			const match = mounts.find((m) => m.vPath === target);
			if (!match) {
				return {
					stderr: `mount: ${target}: not mounted`,
					exitCode: 32,
				};
			}
			const opts = match.readOnly ? "ro" : "rw";
			const line = `${match.hostPath} on ${match.vPath} type host (${opts})`;
			return { stdout: `${line}\n`, exitCode: 0 };
		}

		return {
			stderr:
				"mount: invalid argument(s)\nTry 'mount --help' for more information.",
			exitCode: 1,
		};
	},
};

function resolvePathOrAbsolute(cwd: string, p: string): string {
	if (p.startsWith("/")) {
		return path.posix.normalize(p);
	}
	return path.posix.join(cwd, p);
}
