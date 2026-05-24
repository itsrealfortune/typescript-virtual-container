import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";

/**
 * Read stdin and write to stdout and files simultaneously.
 * @category text
 * @params ["[-a] <file...>"]
 */
export const teeCommand: ShellModule = {
	name: "tee",
	description: "Read stdin, write to stdout and files",
	category: "text",
	params: ["[-a] <file...>"],
	run: ({ shell, cwd, args, stdin, uid, gid }) => {
		const append = ifFlag(args, ["-a"]);
		const files = args.filter((a) => !a.startsWith("-"));
		const input = stdin ?? "";
		for (const f of files) {
			const p = resolvePath(cwd, f);
			if (append) {
				const existing = (() => {
					try {
						return shell.vfs.readFile(p, uid, gid);
					} catch {
						return "";
					}
				})();
				shell.vfs.writeFile(p, existing + input, {}, uid, gid);
			} else {
				shell.vfs.writeFile(p, input, {}, uid, gid);
			}
		}
		return { stdout: input, exitCode: 0 };
	},
};
