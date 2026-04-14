import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ShellModule } from "../../types/commands";
import {
	normalizeTerminalOutput,
	parseOutputPath,
	resolvePath,
	stripUrlFilename,
} from "./helpers";

function runHostWget(args: string[]): Promise<{
	stdout: string;
	stderr: string;
	exitCode: number;
}> {
	return new Promise((resolve) => {
		let childProcess: ReturnType<typeof spawn>;

		try {
			childProcess = spawn("wget", args, {
				stdio: ["ignore", "pipe", "pipe"],
			});
		} catch (error) {
			resolve({
				stdout: "",
				stderr: `wget: ${error instanceof Error ? error.message : String(error)}`,
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
				stderr: "wget: failed to capture process output",
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
				stderr: `wget: ${error.message}`,
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

export const wgetCommand: ShellModule = {
	name: "wget",
	params: ["[url]"],
	run: async ({ vfs, cwd, args }) => {
		const { outputPath, inputArgs } = parseOutputPath(args);
		const url = inputArgs[0];
		const isHelpLike = inputArgs.some(
			(arg) =>
				arg === "-h" || arg === "--help" || arg === "-V" || arg === "--version",
		);

		if (!url) {
			return { stderr: "wget: missing URL", exitCode: 1 };
		}

		if (isHelpLike) {
			const result = await runHostWget(inputArgs);
			return {
				stdout: normalizeTerminalOutput(result.stdout),
				stderr: result.stderr
					? normalizeTerminalOutput(result.stderr)
					: undefined,
				exitCode: result.exitCode,
			};
		}

		const tempDir = await mkdtemp(join(tmpdir(), "virtual-env-js-wget-"));
		const tempFile = join(tempDir, "download");

		try {
			const hostArgs = [...inputArgs, "-O", tempFile];
			const result = await runHostWget(hostArgs);

			if (result.exitCode !== 0) {
				return {
					stderr: normalizeTerminalOutput(
						result.stderr || `wget: exited with code ${result.exitCode}`,
					),
					exitCode: result.exitCode,
				};
			}

			const content = await readFile(tempFile, "utf8");
			const target = resolvePath(cwd, outputPath ?? stripUrlFilename(url));
			vfs.writeFile(target, content);

			return {
				stdout: `saved ${target}`,
				exitCode: 0,
			};
		} finally {
			await rm(tempDir, { recursive: true, force: true });
		}
	},
};
