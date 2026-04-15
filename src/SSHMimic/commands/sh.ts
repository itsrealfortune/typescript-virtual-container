import type { CommandContext, ShellModule } from "../../types/commands";
import { runCommand } from "./index";

/** Simple shell script executor with basic variable support */
export const shCommand: ShellModule = {
	name: "sh",
	params: ["-c <script>", "[<file>]"],
	aliases: ["bash"],
	run: async (ctx: CommandContext) => {
		const { vfs, args, authUser, hostname, users, mode, cwd } = ctx;

		// Handle -c option: sh -c "command"
		if (args[0] === "-c" && args.length >= 2) {
			const script = args[1] ?? "";
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
			let exitCode = 0;

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
					runCommand(command, authUser, hostname, users, mode, cwd, vfs),
				);

				if (result.stdout) {
					output += `${result.stdout}\n`;
				}

				if (result.stderr) {
					return { stderr: result.stderr, exitCode: result.exitCode ?? 1 };
				}

				exitCode = result.exitCode ?? 0;
				if (exitCode !== 0) {
					break;
				}
			}

			return {
				stdout: output.trimEnd(),
				exitCode,
			};
		}

		// Handle script file execution: sh <file>
		if (args.length > 0 && args[0]) {
			try {
				const scriptFile = args[0];
				const content = vfs.readFile(scriptFile);
				const scriptArgs = args.slice(1);

				// Split by newline
				const lines = content
					.split("\n")
					.map((line) => line.trim())
					.filter((line) => line && !line.startsWith("#"));

				let output = "";
				let exitCode = 0;

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
						runCommand(command, authUser, hostname, users, mode, cwd, vfs),
					);

					if (result.stdout) {
						output += `${result.stdout}\n`;
					}

					if (result.stderr) {
						return { stderr: result.stderr, exitCode: result.exitCode ?? 1 };
					}

					exitCode = result.exitCode ?? 0;
					if (exitCode !== 0) {
						break;
					}
				}

				return {
					stdout: output.trimEnd(),
					exitCode,
				};
			} catch {
				return {
					stderr: `sh: ${args[0]}: No such file or directory`,
					exitCode: 1,
				};
			}
		}

		return { stderr: "sh: missing operand or script", exitCode: 1 };
	},
};
