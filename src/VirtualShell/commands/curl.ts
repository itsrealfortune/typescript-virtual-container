import { spawn } from "node:child_process";
import type { ShellModule } from "../../types/commands";
import { getArg, getFlag, ifFlag } from "./command-helpers";
import {
	assertPathAccess,
	normalizeTerminalOutput,
	resolvePath,
} from "./helpers";

function runHostCurl(args: string[]): Promise<{
	stdout: string;
	stderr: string;
	exitCode: number;
}> {
	return new Promise((resolve) => {
		let childProcess: ReturnType<typeof spawn>;

		try {
			childProcess = spawn("curl", args, {
				stdio: ["ignore", "pipe", "pipe"],
			});
		} catch (error) {
			resolve({
				stdout: "",
				stderr: `curl: ${error instanceof Error ? error.message : String(error)}`,
				exitCode: 1,
			});
			return;
		}

		let stdout = "";
		let stderr = "";
		const stdoutStream = childProcess.stdout;
		const stderrStream = childProcess.stderr;

		if (!stdoutStream || !stderrStream) {
			resolve({
				stdout: "",
				stderr: "curl: failed to capture process output",
				exitCode: 1,
			});
			return;
		}

		stdoutStream.setEncoding("utf8");
		stderrStream.setEncoding("utf8");

		stdoutStream.on("data", (chunk: string) => {
			stdout += chunk;
		});

		stderrStream.on("data", (chunk: string) => {
			stderr += chunk;
		});

		childProcess.on("error", (error) => {
			const errorCode =
				error instanceof Error && "code" in error
					? String((error as NodeJS.ErrnoException).code ?? "")
					: "";
			resolve({
				stdout: "",
				stderr: `curl: ${error.message}`,
				exitCode: errorCode === "ENOENT" ? 127 : 1,
			});
		});

		childProcess.on("close", (code) => {
			resolve({
				stdout,
				stderr,
				exitCode: code ?? 1,
			});
		});
	});
}

export const curlCommand: ShellModule = {
	name: "curl",
	params: ["[-o file] <url>"],
	run: async ({ authUser, vfs, cwd, args }) => {
		const outputPathValue = getFlag(args, ["-o", "--output"]);
		const outputPath =
			typeof outputPathValue === "string" && outputPathValue.length > 0
				? outputPathValue
				: null;
		const parserOptions = { flagsWithValue: ["-o", "--output"] };
		const inputArgs: string[] = [];
		for (let index = 0; ; index += 1) {
			const arg = getArg(args, index, parserOptions);
			if (!arg) {
				break;
			}
			inputArgs.push(arg);
		}
		const url = inputArgs[0];
		const isHelpLike = ifFlag(args, ["-h", "--help", "-V", "--version"]);

		if (!url) {
			return { stderr: "curl: missing URL", exitCode: 1 };
		}

		const passthroughArgs = outputPath ? [...inputArgs, "-o", "-"] : inputArgs;
		const result = await runHostCurl(passthroughArgs);

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
			vfs.writeFile(target, result.stdout);
			return {
				stderr: result.stderr
					? normalizeTerminalOutput(result.stderr)
					: undefined,
				exitCode: 0,
			};
		}

		return {
			stdout: isHelpLike
				? normalizeTerminalOutput(result.stdout)
				: result.stdout,
			stderr: result.stderr
				? normalizeTerminalOutput(result.stderr)
				: undefined,
			exitCode: 0,
		};
	},
};
