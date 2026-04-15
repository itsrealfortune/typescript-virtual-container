import { defaultShellProperties } from "..";
import type { CommandContext, ShellModule } from "../../types/commands";
import { getArg, getFlag } from "./command-helpers";
import { runCommand } from "./index";

/** Simple shell script executor with basic variable support */
export const shCommand: ShellModule = {
	name: "sh",
	params: ["-c <script>", "[<file>]"],
	aliases: ["bash"],
	run: async (ctx: CommandContext) => {
		const { vfs, args, authUser, hostname, users, mode, cwd } = ctx;

		// Handle -c option: sh -c "command"
		if (getFlag(args, "-c") && args.length >= 2) {
			const script = getArg(args, 1) ?? "";
			if (!script) {
				return { stderr: "sh: -c requires a script", exitCode: 1 };
			}
			const scriptArgs = args.slice(2);

			// Split by semicolon and newline
			const lines = script
				.split(/[;\n]/)
				.map((line) => line.trim())
				.filter((line) => line && !line.startsWith("#"));

			let output = "";
			const exitCode = 0;

			for (const line of lines) {
				// Simple variable substitution
				let command = line;
				for (let i = 0; i < scriptArgs.length; i++) {
					const arg = scriptArgs[i] ?? "";
					command = command.replaceAll(`$${i}`, arg);
				}
				command = command.replaceAll("$@", scriptArgs.join(" "));

				// Execute the command
				const result = await Promise.resolve(
					runCommand(
						command,
						authUser,
						hostname,
						users,
						mode,
						cwd,
						defaultShellProperties,
						vfs,
					),
				);

				if (result.stdout) {
					output += `${result.stdout}\n`;
				}

				if (result.stderr) {
					return { stderr: result.stderr, exitCode: result.exitCode ?? 1 };
				}
			}

			return { stdout: output.trim(), exitCode };
		}

		return { stderr: "sh: invalid usage", exitCode: 1 };
	},
};
