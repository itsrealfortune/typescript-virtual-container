import { spawn } from "node:child_process";
import type { ShellModule } from "../../types/commands";
import { normalizeTerminalOutput, resolvePath } from "./helpers";

function parseCurlOutputPath(args: string[]): {
	outputPath: string | null;
	inputArgs: string[];
} {
	const filtered: string[] = [];
	let outputPath: string | null = null;

	for (let index = 0; index < args.length; index += 1) {
		const arg = args[index]!;

		if (arg === "-o" || arg === "--output") {
			outputPath = args[index + 1] ?? null;
			index += 1;
			continue;
		}

		if (arg.startsWith("-o=")) {
			outputPath = arg.slice(3);
			continue;
		}

		if (arg.startsWith("--output=")) {
			outputPath = arg.slice("--output=".length);
			continue;
		}

		filtered.push(arg);
	}

	return { outputPath, inputArgs: filtered };
}

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
	run: async ({ vfs, cwd, args }) => {
		const { outputPath, inputArgs } = parseCurlOutputPath(args);
		const url = inputArgs[0];
		const isHelpLike = inputArgs.some(
			(arg) =>
				arg === "-h" || arg === "--help" || arg === "-V" || arg === "--version",
		);

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
			vfs.writeFile(resolvePath(cwd, outputPath), result.stdout);
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
