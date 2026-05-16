import { runCommandDirect } from "../commands";
import { resolvePath } from "../commands/helpers";
import type { CommandMode, CommandResult, ShellEnv } from "../types/commands";
import type {
	Pipeline,
	PipelineCommand,
	Statement,
} from "../types/pipeline";
import type { VirtualShell } from "../VirtualShell";

// ── Script executor (handles &&/||/;) ────────────────────────────────────────


export async function executeStatements(
	statements: Statement[],
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	env: ShellEnv,
): Promise<CommandResult> {
	let last: CommandResult = { exitCode: 0 };
	const accumulatedStdout: string[] = [];
	let currentCwd = cwd; // track cwd changes from cd, su, etc.
	let i = 0;

	while (i < statements.length) {
		const stmt = statements[i]!;

		if (stmt.background) {
			// Background job: fire with AbortController so kill can cancel it.
			const ac = new AbortController();
			executePipeline(
				stmt.pipeline, authUser, hostname, "background", currentCwd, shell, env, ac,
			);
			last = { exitCode: 0 };
			env.lastExitCode = 0;
			i++;
			continue;
		}

		last = await executePipeline(
			stmt.pipeline,
			authUser,
			hostname,
			mode,
			currentCwd,
			shell,
			env,
		);
		env.lastExitCode = last.exitCode ?? 0;

		// Propagate cwd changes (cd, su -l, etc.)
		if (last.nextCwd && (last.exitCode ?? 0) === 0) {
			currentCwd = last.nextCwd;
		}

		// Collect stdout from each statement (for echo a; echo b → "a\nb\n")
		if (last.stdout) accumulatedStdout.push(last.stdout);

		if (last.closeSession || last.switchUser) {
			return {
				...last,
				stdout: accumulatedStdout.join("") || last.stdout,
			};
		}

		const op = stmt.op;
		if (!op || op === ";") {
			// always run next
		} else if (op === "&&") {
			if ((last.exitCode ?? 0) !== 0) {
				// skip until next ; or end
				while (i < statements.length && statements[i]?.op === "&&") i++;
			}
		} else if (op === "||") {
			if ((last.exitCode ?? 0) === 0) {
				// skip until next ; or end
				while (i < statements.length && statements[i]?.op === "||") i++;
			}
		}
		i++;
	}
	// Merge accumulated stdout (for "echo a; echo b" → "a\nb\n")
	const merged = accumulatedStdout.join("");
	// Preserve the deepest cwd change across the whole pipeline
	return { ...last, stdout: merged || last.stdout, nextCwd: currentCwd !== cwd ? currentCwd : undefined };
}

// ── Pipeline executor ─────────────────────────────────────────────────────────

export async function executePipeline(
	pipeline: Pipeline,
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	env?: ShellEnv,
	abortController?: AbortController,
): Promise<CommandResult> {
	if (!pipeline.isValid)
		return { stderr: pipeline.error || "Syntax error", exitCode: 1 };
	if (pipeline.commands.length === 0) return { exitCode: 0 };

	const shellEnv: ShellEnv = env ?? { vars: {}, lastExitCode: 0 };

	if (pipeline.commands.length === 1) {
		return executeSingleCommandWithRedirections(
			pipeline.commands[0] as PipelineCommand,
			authUser,
			hostname,
			mode,
			cwd,
			shell,
			shellEnv,
			abortController,
		);
	}

	return executePipelineChain(
		pipeline.commands as PipelineCommand[],
		authUser,
		hostname,
		mode,
		cwd,
		shell,
		shellEnv,
	);
}

async function executeSingleCommandWithRedirections(
	cmd: PipelineCommand,
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	env: ShellEnv,
	abortController?: AbortController,
): Promise<CommandResult> {
	let stdin: string | undefined;
	if (cmd.inputFile) {
		const inputPath = resolvePath(cwd, cmd.inputFile);
		try {
			stdin = shell.vfs.readFile(inputPath);
		} catch {
			return {
				stderr: `${cmd.inputFile}: No such file or directory`,
				exitCode: 1,
			};
		}
	}

	const isBackground = mode === "background";
	const result = await runCommandDirect(
		cmd.name,
		cmd.args,
		authUser,
		hostname,
		mode,
		cwd,
		shell,
		stdin,
		env,
		isBackground,
		abortController,
	);

	if (cmd.outputFile) {
		const outputPath = resolvePath(cwd, cmd.outputFile);
		const output = result.stdout || "";
		try {
			if (cmd.appendOutput) {
				const existing = (() => {
					try {
						return shell.vfs.readFile(outputPath);
					} catch {
						return "";
					}
				})();
				shell.writeFileAsUser(authUser, outputPath, existing + output);
			} else {
				shell.writeFileAsUser(authUser, outputPath, output);
			}
			return { ...result, stdout: "" };
		} catch {
			return {
				...result,
				stderr: `Failed to write to ${cmd.outputFile}`,
				exitCode: 1,
			};
		}
	}

	return result;
}

async function executePipelineChain(
	commands: PipelineCommand[],
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
	env: ShellEnv,
): Promise<CommandResult> {
	let currentOutput = "";
	let exitCode = 0;

	for (let i = 0; i < commands.length; i++) {
		const cmd = commands[i] as PipelineCommand;

		if (i === 0 && cmd.inputFile) {
			const inputPath = resolvePath(cwd, cmd.inputFile);
			try {
				currentOutput = shell.vfs.readFile(inputPath);
			} catch {
				return {
					stderr: `${cmd.inputFile}: No such file or directory`,
					exitCode: 1,
				};
			}
		}

		const result = await runCommandDirect(
			cmd.name,
			cmd.args,
			authUser,
			hostname,
			mode,
			cwd,
			shell,
			currentOutput,
			env,
		);
		exitCode = result.exitCode ?? 0;

		// 2>&1 — merge stderr into stdout
		const effectiveResult = cmd.stderrToStdout
			? { ...result, stdout: (result.stdout ?? '') + (result.stderr ?? ''), stderr: undefined }
			: result;

		// 2>file — redirect stderr to file
		if (cmd.stderrFile && effectiveResult.stderr) {
			const sp = resolvePath(cwd, cmd.stderrFile);
			try {
				const ex = (() => { try { return shell.vfs.readFile(sp); } catch { return ''; } })();
				shell.writeFileAsUser(authUser, sp, cmd.stderrAppend ? ex + effectiveResult.stderr : effectiveResult.stderr);
			} catch {}
		}

		if (i === commands.length - 1 && cmd.outputFile) {
			const outputPath = resolvePath(cwd, cmd.outputFile);
			const output = result.stdout || "";
			try {
				if (cmd.appendOutput) {
					const existing = (() => {
						try {
							return shell.vfs.readFile(outputPath);
						} catch {
							return "";
						}
					})();
					shell.writeFileAsUser(authUser, outputPath, existing + output);
				} else {
					shell.writeFileAsUser(authUser, outputPath, output);
				}
				currentOutput = "";
			} catch {
				return { stderr: `Failed to write to ${cmd.outputFile}`, exitCode: 1 };
			}
		} else {
			currentOutput = effectiveResult.stdout || "";
		}

		if (effectiveResult.stderr && exitCode !== 0)
			return { stderr: effectiveResult.stderr, exitCode };
		if (effectiveResult.closeSession || effectiveResult.switchUser) return effectiveResult;
	}

	return { stdout: currentOutput, exitCode };
}
