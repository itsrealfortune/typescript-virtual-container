import { runCommandDirect } from "../../commands";
import { resolvePath } from "../../commands/helpers";
import type { CommandMode, CommandResult, ShellEnv } from "../../types/commands";
import type {
	Pipeline,
	PipelineCommand,
	Statement,
} from "../../types/pipeline";
import type { VirtualShell } from "../VirtualShell";

// ── Script executor (handles &&/||/;) ────────────────────────────────────────


/**
 * Executes a list of shell statements sequentially, respecting `&&`, `||`, and `;`
 * operators. Accumulates stdout across statements and tracks cwd changes.
 * Handles subshells (recursively with isolated env) and command groups (in current context).
 */
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
	let currentCwd = cwd;
	let i = 0;

	while (i < statements.length) {
		const stmt = statements[i]!;

		// Subshell: execute in isolated context
		if (stmt.subshell) {
			const subEnv: ShellEnv = { vars: { ...env.vars }, lastExitCode: env.lastExitCode };
			last = await executeStatements(
				stmt.subshell.statements,
				authUser,
				hostname,
				mode,
				currentCwd,
				shell,
				subEnv,
			);
			// Subshell cwd changes do NOT propagate to parent
			env.lastExitCode = last.exitCode ?? 0;
			if (last.stdout) accumulatedStdout.push(last.stdout);
			if (last.closeSession || last.switchUser) {
				return { ...last, stdout: accumulatedStdout.join("") || last.stdout };
			}
			i++;
			continue;
		}

		// Command group: execute in current context (cwd changes propagate)
		if (stmt.group) {
			last = await executeStatements(
				stmt.group.statements,
				authUser,
				hostname,
				mode,
				currentCwd,
				shell,
				env,
			);
			if (last.nextCwd && (last.exitCode ?? 0) === 0) {
				currentCwd = last.nextCwd;
			}
			env.lastExitCode = last.exitCode ?? 0;
			if (last.stdout) accumulatedStdout.push(last.stdout);
			if (last.closeSession || last.switchUser) {
				return { ...last, stdout: accumulatedStdout.join("") || last.stdout };
			}
			i++;
			continue;
		}

		// Background job
		if (stmt.background && stmt.pipeline) {
			const ac = new AbortController();
			executePipeline(
				stmt.pipeline, authUser, hostname, "background", currentCwd, shell, env, ac,
			);
			last = { exitCode: 0 };
			env.lastExitCode = 0;
			i++;
			continue;
		}

		if (!stmt.pipeline) {
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

		if (last.nextCwd && (last.exitCode ?? 0) === 0) {
			currentCwd = last.nextCwd;
		}

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
				while (i < statements.length && statements[i]?.op === "&&") i++;
			}
		} else if (op === "||") {
			if ((last.exitCode ?? 0) === 0) {
				while (i < statements.length && statements[i]?.op === "||") i++;
			}
		}
		i++;
	}
	const merged = accumulatedStdout.join("");
	return { ...last, stdout: merged || last.stdout, nextCwd: currentCwd !== cwd ? currentCwd : undefined };
}

// ── Pipeline executor ─────────────────────────────────────────────────────────

/**
 * Executes a shell pipeline of commands connected by pipes. Handles redirections,
 * input/output files, and stderr redirects. Delegates to the single-command or
 * chained-pipeline executor based on command count.
 */
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
		const uid = shell.users.getUid(authUser);
		const gid = shell.users.getGid(authUser);
		try {
			if (cmd.appendOutput) {
				const existing = (() => {
					try {
						return shell.vfs.readFile(outputPath, uid, gid);
					} catch {
						return "";
					}
				})();
				shell.vfs.writeFile(outputPath, existing + output, {}, uid, gid);
			} else {
				shell.vfs.writeFile(outputPath, output, {}, uid, gid);
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
			const uid = shell.users.getUid(authUser);
			const gid = shell.users.getGid(authUser);
			try {
				const ex = (() => { try { return shell.vfs.readFile(sp, uid, gid); } catch { return ''; } })();
				shell.vfs.writeFile(sp, cmd.stderrAppend ? ex + effectiveResult.stderr : effectiveResult.stderr, {}, uid, gid);
			} catch { /* best-effort stderr write */ }
		}

		if (i === commands.length - 1 && cmd.outputFile) {
			const outputPath = resolvePath(cwd, cmd.outputFile);
			const output = result.stdout || "";
			const uid = shell.users.getUid(authUser);
			const gid = shell.users.getGid(authUser);
			try {
				if (cmd.appendOutput) {
					const existing = (() => {
						try {
							return shell.vfs.readFile(outputPath, uid, gid);
						} catch {
							return "";
						}
					})();
					shell.vfs.writeFile(outputPath, existing + output, {}, uid, gid);
				} else {
					shell.vfs.writeFile(outputPath, output, {}, uid, gid);
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
