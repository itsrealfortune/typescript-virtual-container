import * as path from "node:path";
import type {ShellModule} from "../types/commands";
import {ifFlag, parseArgs} from "./command-helpers";

export const mountCommand: ShellModule = {
	name: "mount",
	description: "Mount a filesystem or list active mounts",
	category: "system",
	params: ["[-o <options>] [-t <fstype>] [source] [target]"],
	run: ({shell, cwd, args}) => {
		if (ifFlag(args, ["--help", "-h"])) {
			return {
				stdout: [
					"Usage: mount [options] [source] [target]",
					"  -o, --options <opts>   Mount options (ro, rw, remount)",
					"  -t, --type <fstype>    Filesystem type (ignored in virtual env)",
					"  -h, --help             Show this help",
					"",
					"Without arguments, list active mounts.",
				].join("\n"),
				exitCode: 0,
			};
		}

		const {flagsWithValues, positionals} = parseArgs(args, {
			flagsWithValue: ["-o", "--options", "-t", "--type"],
		});

		// mount (no args) — list mounts
		if (positionals.length === 0) {
			const mounts = shell.vfs.getMounts();
			if (mounts.length === 0) {
				return {stdout: "", exitCode: 0};
			}
			const lines = mounts.map((m) => {
				const opts = m.readOnly ? "ro" : "rw";
				return `${m.hostPath} on ${m.vPath} type host (${opts})`;
			});
			return {stdout: `${lines.join("\n")}\n`, exitCode: 0};
		}

		const options =
			flagsWithValues.get("-o") ?? flagsWithValues.get("--options") ?? "";
		const isReadOnly = options.includes("ro") && !options.includes("rw");
		const isRemount = options.includes("remount");

		if (positionals.length >= 2) {
			const source = resolvePathOrAbsolute(cwd, positionals[0]!);
			const target = resolvePathOrAbsolute(cwd, positionals[1]!);

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
				return {exitCode: 0};
			}

			try {
				shell.vfs.mount(target, source, {readOnly: isReadOnly});
				return {exitCode: 0};
			} catch (err: unknown) {
				const msg = err instanceof Error ? err.message : String(err);
				return {stderr: `mount: ${msg}`, exitCode: 32};
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
			return {stdout: `${line}\n`, exitCode: 0};
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
