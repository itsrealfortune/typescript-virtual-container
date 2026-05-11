import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";

/**
 * Display file or filesystem status.
 * Outputs: path, size, mode, type, timestamps — similar to `stat` on Linux.
 */
export const statCommand: ShellModule = {
	name: "stat",
	description: "Display file status",
	category: "files",
	params: ["[-c <format>] <file>"],
	run: ({ shell, cwd, args }) => {
		const fmtIdx = args.findIndex((a) => a === "-c" || a === "--format");
		const fmt = fmtIdx !== -1 ? args[fmtIdx + 1] : undefined;
		const file = args.find((a) => !a.startsWith("-") && a !== fmt);
		if (!file) return { stderr: "stat: missing operand\n", exitCode: 1 };

		const p = resolvePath(cwd, file);
		if (!shell.vfs.exists(p)) {
			return { stderr: `stat: cannot stat '${file}': No such file or directory\n`, exitCode: 1 };
		}

		const st = shell.vfs.stat(p);
		const isDir = st.type === "directory";
		const _isLink = shell.vfs.isSymlink(p);
		const isSymlink = shell.vfs.isSymlink(p);
		const modePerm = (mode: number): string => {
			const bits = [0o400,0o200,0o100,0o040,0o020,0o010,0o004,0o002,0o001];
			const syms = ["r","w","x","r","w","x","r","w","x"];
			return (isDir ? "d" : isSymlink ? "l" : "-") +
				bits.map((b, i) => mode & b ? syms[i] : "-").join("");
		};
		const octal = (st.mode).toString(8).padStart(4, "0");
		const modeStr = modePerm(st.mode);
		const size = "size" in st ? (st as {size: number}).size : 0;
		const ts = (d: Date) => d.toISOString().replace("T", " ").replace(/\.\d+Z$/, " +0000");

		// -c format string support
		if (fmt) {
			const out = fmt
				.replace("%n", file)
				.replace("%s", String(size))
				.replace("%a", octal.slice(1)) // access in octal (no leading 0)
				.replace("%A", modeStr)
				.replace("%F", isSymlink ? "symbolic link" : isDir ? "directory" : "regular file")
				.replace("%y", ts(st.updatedAt))
				.replace("%z", ts(st.updatedAt));
			return { stdout: `${out}\n`, exitCode: 0 };
		}

		const out = [
			`  File: ${file}${isSymlink ? ` -> ${shell.vfs.resolveSymlink(p)}` : ""}`,
			`  Size: ${size}${"\t".repeat(3)}${isSymlink ? "symbolic link" : isDir ? "directory" : "regular file"}`,
			`Access: (${octal}/${modeStr})  Uid: (    0/    root)   Gid: (    0/    root)`,
			`Modify: ${ts(st.updatedAt)}`,
			`Change: ${ts(st.updatedAt)}`,
		].join("\n");
		return { stdout: `${out}\n`, exitCode: 0 };
	},
};
