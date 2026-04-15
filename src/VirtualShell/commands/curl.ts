import type { ShellModule } from "../../types/commands";
import { parseArgs } from "./command-helpers";
import {
	assertPathAccess,
	normalizeTerminalOutput,
	resolvePath,
	runHostCommand,
} from "./helpers";

export const curlCommand: ShellModule = {
	name: "curl",
	params: ["[-o file] <url>"],
	run: async ({ authUser, cwd, args, shell }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-o", "--output"],
		});
		const outputPath =
			flagsWithValues.get("-o") || flagsWithValues.get("--output") || null;
		const url = positionals[0];

		if (!url) {
			return { stderr: "curl: missing URL", exitCode: 1 };
		}

		const passthroughArgs = outputPath
			? [...positionals, "-o", "-"]
			: positionals;
		const result = await runHostCommand("curl", passthroughArgs);

		if (result.exitCode !== 0) {
			return {
				stderr: normalizeTerminalOutput(
					result.stderr || `curl: exited with code ${result.exitCode}`,
				),
				exitCode: result.exitCode,
			};
		}

		if (outputPath) {
			const target = resolvePath(cwd, outputPath);
			assertPathAccess(authUser, target, "curl");
			shell.writeFileAsUser(authUser, target, result.stdout);
			return {
				stderr: result.stderr
					? normalizeTerminalOutput(result.stderr)
					: undefined,
				exitCode: 0,
			};
		}

		return {
			stdout: result.stdout,
			stderr: result.stderr
				? normalizeTerminalOutput(result.stderr)
				: undefined,
			exitCode: 0,
		};
	},
};
