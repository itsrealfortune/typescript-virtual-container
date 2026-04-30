import type { ShellModule } from "../types/commands";
import { ifFlag } from "./command-helpers";
import { resolvePath } from "./helpers";

export const teeCommand: ShellModule = {
	name: "tee",
	description: "Read stdin, write to stdout and files",
	category: "text",
	params: ["[-a] <file...>"],
	run: ({ authUser, shell, cwd, args, stdin }) => {
		const append = ifFlag(args, ["-a"]);
		const files = args.filter((a) => !a.startsWith("-"));
		const input = stdin ?? "";
		for (const f of files) {
			const p = resolvePath(cwd, f);
			if (append) {
				const existing = (() => { try { return shell.vfs.readFile(p); } catch { return ""; } })();
				shell.writeFileAsUser(authUser, p, existing + input);
			} else {
				shell.writeFileAsUser(authUser, p, input);
			}
		}
		return { stdout: input, exitCode: 0 };
	},
};
