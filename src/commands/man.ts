import type { ShellModule } from "../types/commands";
import { MANUALS } from "./manuals-bundle";

const MANUAL_ALIASES: Record<string, string> = {
	gunzip: "gzip",
};

/**
 * Interface to the system reference manuals.
 * @category shell
 * @params ["<command>"]
 */
export const manCommand: ShellModule = {
	name: "man",
	description: "Interface to the system reference manuals",
	category: "shell",
	params: ["<command>"],
	run: async ({ args, shell }) => {
		const name = args[0];
		if (!name) return { stderr: "What manual page do you want?", exitCode: 1 };

		// VFS-installed man pages take priority
		const manPath = `/usr/share/man/man1/${name}.1`;
		if (shell.vfs.exists(manPath)) {
			return { stdout: shell.vfs.readFile(manPath), exitCode: 0 };
		}

		// Bundled manuals — available in all build modes (standalone, web, dev)
		const normalized = name.toLowerCase();
		const lookupName = MANUAL_ALIASES[normalized] ?? normalized;
		const page = MANUALS[lookupName] ?? null;
		if (page) return { stdout: page, exitCode: 0 };

		return { stderr: `No manual entry for ${name}`, exitCode: 16 };
	},
};
