import type { ShellModule } from "../types/commands";
import { assertPathAccess, resolvePath } from "./helpers";

/**
 * Parse a symbolic chmod mode string (e.g. "+x", "u+x", "go-w", "a+rx")
 * and apply it to the existing mode bits.
 * Returns null if the string is not a valid symbolic mode.
 */
function applySymbolicMode(existing: number, modeStr: string): number | null {
	const pattern = /^([ugoa]*)([+\-=])([rwx]*)$/;
	const parts = modeStr.split(",");
	let mode = existing;
	for (const part of parts) {
		const m = part.trim().match(pattern);
		if (!m) return null;
		const [, who = "a", op, perms = ""] = m;
		const targets = who === "" || who === "a" ? ["u", "g", "o"] : who.split("");
		const bits: Record<string, Record<string, number>> = {
			u: { r: 0o400, w: 0o200, x: 0o100 },
			g: { r: 0o040, w: 0o020, x: 0o010 },
			o: { r: 0o004, w: 0o002, x: 0o001 },
		};
		for (const t of targets) {
			for (const p of perms.split("")) {
				const bit = bits[t]?.[p];
				if (bit === undefined) continue;
				if (op === "+") mode |= bit;
				else if (op === "-") mode &= ~bit;
				else if (op === "=") {
					// clear all bits for this target, then set requested
					const mask = Object.values(bits[t] ?? {}).reduce((a, b) => a | b, 0);
					mode = (mode & ~mask) | bit;
				}
			}
		}
	}
	return mode;
}

export const chmodCommand: ShellModule = {
	name: "chmod",
	description: "Change file permissions",
	category: "files",
	params: ["<mode> <file>"],
	run: ({ authUser, shell, cwd, args }) => {
		const [modeArg, fileArg] = args;
		if (!modeArg || !fileArg) {
			return { stderr: "chmod: missing operand", exitCode: 1 };
		}

		const filePath = resolvePath(cwd, fileArg);
		try {
			assertPathAccess(authUser, filePath, "chmod");
			if (!shell.vfs.exists(filePath)) {
				return {
					stderr: `chmod: ${fileArg}: No such file or directory`,
					exitCode: 1,
				};
			}
			let mode: number;
			const octal = parseInt(modeArg, 8);
			if (!Number.isNaN(octal) && /^[0-7]+$/.test(modeArg)) {
				mode = octal;
			} else {
				// symbolic mode
				const existing = shell.vfs.stat(filePath).mode;
				const result = applySymbolicMode(existing, modeArg);
				if (result === null) {
					return { stderr: `chmod: invalid mode: ${modeArg}`, exitCode: 1 };
				}
				mode = result;
			}
			shell.vfs.chmod(filePath, mode);
			return { exitCode: 0 };
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			return { stderr: `chmod: ${msg}`, exitCode: 1 };
		}
	},
};
