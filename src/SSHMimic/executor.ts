import type { CommandMode, CommandResult } from "../types/commands";
import type { Pipeline, PipelineCommand } from "../types/pipeline";
import type { VirtualShell } from "../VirtualShell";
import { runCommand as runSingleCommand } from "../VirtualShell/commands";
import { resolvePath } from "../VirtualShell/commands/helpers";

/**
 * Execute a parsed pipeline, chaining commands and handling redirections.
 * Manages stdout/stderr flow between commands and file I/O.
 */
export async function executePipeline(
	pipeline: Pipeline,
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
): Promise<CommandResult> {
	if (pipeline.commands.length === 0) {
		return { exitCode: 0 };
	}

	if (pipeline.commands.length === 1) {
		// Single command with possible redirections
		return executeSingleCommandWithRedirections(
			pipeline.commands[0] as PipelineCommand,
			authUser,
			hostname,
			mode,
			cwd,
			shell,
		);
	}

	// Multiple commands in a pipeline
	return executePipelineChain(
		pipeline.commands as PipelineCommand[],
		authUser,
		hostname,
		mode,
		cwd,
		shell,
	);
}

/**
 * Execute a single command with input/output redirections
 */
async function executeSingleCommandWithRedirections(
	cmd: PipelineCommand,
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
): Promise<CommandResult> {
	// Prepare input if input file specified
	let stdin: string | undefined;
	if (cmd.inputFile) {
		const inputPath = resolvePath(cwd, cmd.inputFile);
		try {
			stdin = shell.vfs.readFile(inputPath);
		} catch {
			return {
				stderr: `cat: ${cmd.inputFile}: No such file or directory`,
				exitCode: 1,
			};
		}
	}

	// Build raw input for the command
	const rawInput = [cmd.name, ...cmd.args].join(" ");

	// Run the command with potential input
	const result = await runSingleCommand(
		rawInput,
		authUser,
		hostname,
		mode,
		cwd,
		shell,
		stdin,
	);

	// Handle output redirection
	if (cmd.outputFile) {
		const outputPath = resolvePath(cwd, cmd.outputFile);
		const output = result.stdout || "";
		try {
			if (cmd.appendOutput) {
				try {
					const existing = shell.vfs.readFile(outputPath);
					shell.writeFileAsUser(authUser, outputPath, existing + output);
				} catch {
					shell.writeFileAsUser(authUser, outputPath, output);
				}
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

/**
 * Execute a chain of commands connected by pipes
 */
async function executePipelineChain(
	commands: PipelineCommand[],
	authUser: string,
	hostname: string,
	mode: CommandMode,
	cwd: string,
	shell: VirtualShell,
): Promise<CommandResult> {
	let currentOutput = "";
	let exitCode = 0;

	for (let i = 0; i < commands.length; i++) {
		const cmd = commands[i] as PipelineCommand;

		// Handle input file for first command
		if (i === 0 && cmd.inputFile) {
			const inputPath = resolvePath(cwd, cmd.inputFile);
			try {
				currentOutput = shell.vfs.readFile(inputPath);
			} catch {
				return {
					stderr: `cat: ${cmd.inputFile}: No such file or directory`,
					exitCode: 1,
				};
			}
		}

		// Build raw input
		const rawInput = [cmd.name, ...cmd.args].join(" ");

		// Create a modified context that might accept stdin
		// For now, we'll append input as an additional arg for commands that support it
		const result = await runSingleCommand(
			rawInput,
			authUser,
			hostname,
			mode,
			cwd,
			shell,
			currentOutput,
		);

		exitCode = result.exitCode ?? 0;

		// Handle output redirection (only for last command)
		if (i === commands.length - 1 && cmd.outputFile) {
			const outputPath = resolvePath(cwd, cmd.outputFile);
			const output = result.stdout || "";
			try {
				if (cmd.appendOutput) {
					try {
						const existing = shell.vfs.readFile(outputPath);
						shell.writeFileAsUser(authUser, outputPath, existing + output);
					} catch {
						shell.writeFileAsUser(authUser, outputPath, output);
					}
				} else {
					shell.writeFileAsUser(authUser, outputPath, output);
				}
				currentOutput = "";
			} catch {
				return {
					stderr: `Failed to write to ${cmd.outputFile}`,
					exitCode: 1,
				};
			}
		} else {
			// Pass output to next command
			currentOutput = result.stdout || "";
		}

		if (result.stderr && exitCode !== 0) {
			return { stderr: result.stderr, exitCode };
		}
	}

	return { stdout: currentOutput, exitCode };
}
