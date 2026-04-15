import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ShellModule } from "../../types/commands";
import { ifFlag, parseArgs } from "./command-helpers";
import {
	assertPathAccess,
	normalizeTerminalOutput,
	resolvePath,
	runHostCommand,
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
	run: async ({ authUser, cwd, args, shell }) => {
		const { flagsWithValues, positionals } = parseArgs(args, {
			flagsWithValue: ["-o", "-O", "--output", "--output-document"],
		});
		const outputPath =
			flagsWithValues.get("-o") ||
			flagsWithValues.get("-O") ||
			flagsWithValues.get("--output") ||
			flagsWithValues.get("--output-document") ||
			null;
		const url = positionals[0];

		if (!url) {
			return { stderr: "wget: missing URL", exitCode: 1 };
		}

		const isHelpLike = ifFlag(args, ["-h", "--help", "-V", "--version"]);

		if (isHelpLike) {
			const result = await runHostWget(args);
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
			const hostArgs = [...positionals, "-O", tempFile];
			const result = await runHostCommand("wget", hostArgs);

			if (result.exitCode !== 0) {
				return {
					stderr: normalizeTerminalOutput(
						result.stderr || `wget: exited with code ${result.exitCode}`,
					),
					exitCode: result.exitCode,
				};
			}

			const content = await readFile(tempFile, "utf8");
			const target = resolvePath(cwd, outputPath || stripUrlFilename(url));
			assertPathAccess(authUser, target, "wget");
			shell.vfs.writeFile(target, content);

			return {
				stdout: `saved ${target}`,
				exitCode: 0,
			};
		} finally {
			await rm(tempDir, { recursive: true, force: true });
		}
	},
};
