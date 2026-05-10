import type { ShellModule } from "../types/commands";
import { resolvePath } from "./helpers";
import { runCommand } from ".";

export const sourceCommand: ShellModule = {
	name: "source",
	aliases: ["."],
	description: "Execute commands from a file in the current shell environment",
	category: "shell",
	params: ["<file> [args...]"],
	run: async ({ args, authUser, hostname, cwd, shell, env }) => {
		const fileArg = args[0];
		if (!fileArg) {
			return { stderr: "source: missing filename", exitCode: 1 };
		}

		const filePath = resolvePath(cwd, fileArg);
		if (!shell.vfs.exists(filePath)) {
			return {
				stderr: `source: ${fileArg}: No such file or directory`,
				exitCode: 1,
			};
		}

		const content = shell.vfs.readFile(filePath);
		let lastExitCode = 0;

		for (const line of content.split("\n")) {
			const l = line.trim();
			if (!l || l.startsWith("#")) continue;
			const result = await runCommand(
				l,
				authUser,
				hostname,
				"shell",
				cwd,
				shell,
				undefined,
				env,
			);
			lastExitCode = result.exitCode ?? 0;
			if (result.closeSession || result.switchUser) return result;
		}

		return { exitCode: lastExitCode };
	},
};
