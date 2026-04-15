import { spawn } from "node:child_process";

export interface HostProgramResult {
	stdout: string;
	stderr: string;
	exitCode: number;
}

export interface HostProgramOptions {
	stdin?: string;
	cwd?: string;
	/** Restrict process to only access this directory (via cwd isolation) */
	sandboxed?: boolean;
}

export function runHostProgram(
	commandName: string,
	args: string[],
	options: HostProgramOptions = {},
): Promise<HostProgramResult> {
	return new Promise((resolve) => {
		let childProcess: ReturnType<typeof spawn>;

		try {
			childProcess = spawn(commandName, args, {
				cwd: options.cwd,
				stdio:
					options.stdin === undefined
						? ["ignore", "pipe", "pipe"]
						: ["pipe", "pipe", "pipe"],
				// Primary isolation via cwd: npm/node only access files in tempdir
				// containing staged VFS files. sandboxed flag for future use.
			});
		} catch (error) {
			resolve({
				stdout: "",
				stderr: `${commandName}: ${error instanceof Error ? error.message : String(error)}`,
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
				stderr: `${commandName}: failed to capture process output`,
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

		let settled = false;
		const finish = (result: HostProgramResult): void => {
			if (settled) {
				return;
			}

			settled = true;
			resolve(result);
		};

		childProcess.on("error", (error) => {
			const errorCode =
				error instanceof Error && "code" in error
					? String((error as NodeJS.ErrnoException).code ?? "")
					: "";
			finish({
				stdout: "",
				stderr: `${commandName}: ${error.message}`,
				exitCode: errorCode === "ENOENT" ? 127 : 1,
			});
		});

		childProcess.on("close", (code) => {
			finish({
				stdout,
				stderr,
				exitCode: code ?? 1,
			});
		});

		if (options.stdin !== undefined && childProcess.stdin) {
			childProcess.stdin.write(options.stdin);
			childProcess.stdin.end();
		}
	});
}
